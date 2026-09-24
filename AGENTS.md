# xren.ren · VitePress 站点

> 项目路径：`/Users/zhouge/ai/xren/`
> 域名：xren.ren（Cloudflare Pages 部署）
> 定位：「码农修仙传」IP 的品牌入口和内容主站

## 部署方式

push 到 main 分支后，两个 GitHub Actions workflow 同时触发：
1. Cloudflare Pages → https://www.xren.ren（主入口，国内 CDN 快）
2. GitHub Pages → https://zeegoo.github.io/xren.ren/（备用）

无需本地编译，全自动 CI/CD。

## 目录结构

```
xren/
├── docs/
│   ├── index.md              # 首页
│   ├── public/
│   │   └── logo.svg          # 站点 logo
│   ├── lianqi/               # 炼气期
│   ├── zhuji/                # 筑基期
│   ├── jindan/               # 金丹期
│   ├── yuanying/             # 元婴期
│   ├── huashen/              # 化神期
│   ├── dujie/                # 渡劫/大乘
│   └── .vitepress/
│       ├── config.mts        # 站点配置（侧边栏、导航、mermaid）
│       └── theme/            # 自定义主题
├── .github/workflows/
│   └── deploy.yml            # Cloudflare Pages + GitHub Pages 部署
├── package.json
└── start.sh                  # 本地 dev server 启动脚本
```

## 常用命令

```bash
# 启动开发服务器
npx vitepress dev docs --port 5173

# 构建生产版本
npx vitepress build docs

# 新建文章占位
bash new.sh <境界> <编号> <slug> "标题"
```

## 域名配置

- DNS 托管：Cloudflare（NS: brit.ns.cloudflare.com / zac.ns.cloudflare.com）
- xren.ren → 301 跳转到 www.xren.ren（Cloudflare Redirect Rule）
- www.xren.ren → Cloudflare Pages 项目 xren
