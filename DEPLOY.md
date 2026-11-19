# xren.ren 部署说明（DEPLOY）

> 最后核对：2026-11-19。所有结论都来自当时的实测，不是凭记忆写的。

## 一、部署链路

```
改稿 → git push origin main
        ↓
GitHub Actions (.github/workflows/deploy.yml)
        ↓  npm ci && npx vitepress build docs
Cloudflare Pages 项目 xren  ← wrangler-action 上传 docs/.vitepress/dist
        ↓
www.xren.ren（生产）   xren.ren（301 → www）
```

**没有 VPS 了**。根目录的 `部署指南_香港VPS.md` 是 2026 年 9 月之前的历史方案，
那台 `43.135.53.100` 已过期，不要再照着做。

## 二、事实清单（实测）

| 项 | 值 |
|---|---|
| 代码仓库 | https://github.com/zeegoo/xren.ren.git（远程名 origin，HTTPS） |
| 部署分支 | main |
| 构建命令 | `npm ci && npx vitepress build docs` |
| 产物目录 | `docs/.vitepress/dist` |
| Cloudflare Pages 项目 | `xren` |
| Pages 预览域 | `xren-2hg.pages.dev` |
| 生产域 | `www.xren.ren` |
| 裸域 | `xren.ren` → 301 → `https://www.xren.ren/` |
| DNS | `brit.ns.cloudflare.com` / `zac.ns.cloudflare.com`（已在 Cloudflare，阿里云 NS 已不再生效） |
| Cloudflare Account ID | `3f8db8651c6c0067c2f12ac3b64c6bcf`（非密钥，可公开） |
| 最近一次成功部署 | 2026-10-26 11:27 UTC，run 40315250146 |
| 本地 wrangler 登录态 | **未登录**。日常发布只走 GitHub Actions |

GitHub 仓库里有两个 Actions secret（只有名字可见，值在 GitHub 后台，不在本仓库）：

- `CLOUDFLARE_API_TOKEN` — 建于 2026-09-24，Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID` — 建于 2026-09-24，值同上面的 Account ID

## 三、日常操作

```bash
cd ~/mncxc/site

# 本地预览（改完先看效果）
npm ci                       # 第一次或 package-lock 变了才需要
npx vitepress dev docs --port 5173

# 发布就是推 main，别手动传文件
git add -A && git commit -m "content: 新增 xxx"
git push origin main

# 看部署结果
gh run list -R zeegoo/xren.ren --limit 3
gh run watch -R zeegoo/xren.ren

# 线上自检
curl -s -o /dev/null -w "%{http_code}\n" https://www.xren.ren
```

## 四、手动部署（Actions 挂了 / 想从本机直传）

需要一个带 **Cloudflare Pages:Edit** 权限的 API Token，从 Cloudflare 后台生成，
**只放在环境变量里，不要写进任何文件、不要进 git**：

```bash
cd ~/mncxc/site
npx vitepress build docs
CLOUDFLARE_API_TOKEN=<你的token> \
CLOUDFLARE_ACCOUNT_ID=3f8db8651c6c0067c2f12ac3b64c6bcf \
  npx wrangler pages deploy docs/.vitepress/dist --project-name=xren
```

`npx wrangler login` 是另一条路，但会在本机留 OAuth 凭据，换机器时还要重来，
不如直接走 Actions。

## 五、回滚

Cloudflare 后台 → Workers & Pages → xren → Deployments，
挑一个历史部署点 "Rollback"。比改代码回滚快，也不会污染 git 历史。

## 六、换机器 / 换账号时怎么重建

1. `git clone https://github.com/zeegoo/xren.ren.git ~/mncxc/site`
   （包里 `site/.git` 已经是这个仓库的完整克隆，直接拷过去也行，省一次下载）
2. `cd site && npm ci`
3. Cloudflare 后台建 Pages 项目 `xren`（或沿用现有项目）
4. GitHub 仓库 → Settings → Secrets and variables → Actions，补两个 secret
5. 绑定域名：Pages 项目 → Custom domains → 加 `www.xren.ren`；
   apex 的 301 用 Cloudflare Redirect Rules 或 Pages 的 domain 设置维持
6. `git push origin main` 触发一次，确认 `gh run list` 是 success
7. `curl -I https://www.xren.ren` 确认 200

账号完全换新时注意：DNS 的 NS 已经在 Cloudflare，换账号要把域名一起迁走或重新指 NS，
否则站点会解析失败。

## 七、和包的关系

- `site/` 在 `~/mncxc` 里是**完整克隆**（含 `.git`，6.7 MB），但它被根仓库 `.gitignore` 排除，
  自己保有 remote。所以搬家时要么拷目录，要么重新 clone，两条路都通。
- 站点正文是 `site/docs/`，这是**唯一发布源**；`content/drafts/`、`content/published/` 都不直接上线。
- 部署凭据不属于"文件"，只存在于 GitHub secrets 和 Cloudflare 后台——搬家搬不走，必须重新配一次。
