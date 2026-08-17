# xren.ren 香港VPS部署指南

> 玄芯散人 · 码农修仙传 · 静态站点部署

---

## 一、购买香港VPS

### 推荐方案：腾讯云轻量应用服务器（香港）

**配置建议：**
- 规格：2核2G（最低1核1G够用，但2核2G更稳）
- 流量：300GB/月（静态站点用不完）
- 带宽：30Mbps
- 系统：Ubuntu 22.04 LTS
- 价格：约32元/月（1核1G）/ 约50元/月（2核2G）

**购买步骤：**
1. 登录腾讯云控制台 https://console.cloud.tencent.com/lighthouse
2. 创建实例 → 地域选"香港" → 镜像选 Ubuntu 22.04
3. 付费用（按月最灵活）
4. 创建好后记录：公网IP、初始密码

### 备选方案

- 阿里云轻量应用服务器（香港）：价格相近
- 搬瓦工/Vultr：可能更便宜，但网络质量需自己判断

---

## 二、初始化服务器

### 连接服务器

```bash
ssh root@你的服务器IP
```

### 更新系统 + 装nginx

```bash
apt update && apt upgrade -y
apt install nginx -y
```

### 启动nginx并设置开机自启

```bash
systemctl start nginx
systemctl enable nginx
```

### 验证nginx

浏览器打开 `http://你的服务器IP`，看到 nginx 欢迎页说明成功。

---

## 三、部署站点

### 创建站点目录

```bash
mkdir -p /var/www/xren
```

### 在本地build VitePress

在你 Mac 上：

```bash
cd /Users/zhouge/ai/xren
npx vitepress build docs
```

build产物在 `docs/.vitepress/dist/` 目录。

### 上传到服务器

在你 Mac 上：

```bash
scp -r docs/.vitepress/dist/* root@你的服务器IP:/var/www/xren/
```

### 配置nginx

在服务器上：

```bash
cat > /etc/nginx/sites-available/xren << 'EOF'
server {
    listen 80;
    server_name xren.ren www.xren.ren;

    root /var/www/xren;
    index index.html;

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # VitePress静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # HTML不缓存（保证更新即时生效）
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    error_page 404 /404.html;
}
EOF
```

### 启用站点

```bash
ln -s /etc/nginx/sites-available/xren /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t          # 测试配置
systemctl reload nginx
```

---

## 四、配置域名解析

### 域名DNS设置

在你购买 `.ren` 域名的服务商（DNSPod/阿里云DNS/Cloudflare等）：

添加A记录：
```
类型: A
主机记录: @
记录值: 你的服务器IP
TTL: 600
```

添加 www 记录（可选）：
```
类型: A
主机记录: www
记录值: 你的服务器IP
TTL: 600
```

### 验证解析

等几分钟，在本地终端：

```bash
ping xren.ren
```

如果能ping通且显示你的服务器IP，说明解析成功。

---

## 五、配置HTTPS（免费SSL）

### 安装certbot

```bash
apt install certbot python3-certbot-nginx -y
```

### 申请证书

```bash
certbot --nginx -d xren.ren -d www.xren.ren
```

按提示操作：
- 输入邮箱（接收过期提醒）
- 同意服务条款
- 自动配置nginx HTTPS

### 自动续期

certbot会自动设置定时任务，但可以手动验证：

```bash
certbot renew --dry-run
```

### 验证HTTPS

浏览器打开 `https://xren.ren`，看到绿色锁说明成功。

---

## 六、后续更新流程

每次写完新文章或修改内容后，三步更新：

### 1. 本地build

```bash
cd /Users/zhouge/ai/xren
npx vitepress build docs
```

### 2. 上传到服务器

```bash
scp -r docs/.vitepress/dist/* root@你的服务器IP:/var/www/xren/
```

### 3. 完成

不用重启nginx，静态文件直接覆盖即生效。

---

## 七、一键部署脚本（可选）

在本地创建 `deploy.sh`：

```bash
#!/bin/bash
# 码农修仙传 - 一键部署脚本
# 修改下面的IP为你的服务器IP

SERVER_IP="你的服务器IP"
SERVER_PATH="/var/www/xren"

cd "$(dirname "$0")"

echo "📝 Build站点..."
npx vitepress build docs

echo "📤 上传到服务器..."
scp -r docs/.vitepress/dist/* root@${SERVER_IP}:${SERVER_PATH}/

echo "✅ 部署完成！"
echo "🌐 访问: https://xren.ren"
```

赋权并使用：

```bash
chmod +x deploy.sh
bash deploy.sh
```

---

## 八、常用运维命令

```bash
# 查看nginx状态
systemctl status nginx

# 重启nginx
systemctl restart nginx

# 查看nginx日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 查看服务器资源
htop
df -h

# 查看SSL证书状态
certbot certificates

# 手动续期SSL
certbot renew
```

---

## 月度成本估算

| 项目 | 费用 |
|------|------|
| 腾讯云轻量香港 2核2G | 约50元/月 |
| .ren域名（年费） | 约50-100元/年 |
| SSL证书 | 免费（Let's Encrypt） |
| **月均成本** | **约55元/月** |

---

> 玄芯散人 · xren.ren · 带你从炼气修到大乘
