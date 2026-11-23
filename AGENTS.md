# xren.ren · VitePress 站点

> 项目路径：D:\ws\玄芯散人IP\site
> 域名：xren.ren，Cloudflare Pages 部署
> 定位：「码农修仙传」IP 的品牌入口和内容主站

## 部署方式

只有一条链路，没有 GitHub Pages 备份：

```
push main → .github/workflows/deploy.yml
  → npm ci && npx vitepress build docs
  → wrangler pages deploy docs/.vitepress/dist --project-name=xren
  → https://www.xren.ren
```

- 裸域 xren.ren 301 跳到 https://www.xren.ren
- 预览域 xren-2hg.pages.dev
- 凭据只存在于 GitHub secrets：CLOUDFLARE_API_TOKEN、CLOUDFLARE_ACCOUNT_ID
- 本机 wrangler 未登录，日常发布只走 Actions

## 目录结构

```
site/
├── docs/
│   ├── index.md              首页
│   ├── lianqi/ zhuji/ jindan/ yuanying/ huashen/ dujie/
│   ├── public/               静态资源与 dashboard 页
│   └── .vitepress/
│       ├── config.mts        导航、侧边栏、mermaid、搜索
│       └── theme/            自定义主题
├── .github/workflows/deploy.yml
├── DEPLOY.md                 部署事实清单
├── package.json
├── new.sh / start.sh         旧 bash 脚本，Windows 下不直接用
└── 码农修仙传/               未跟踪的旧副本，可忽略
```

## 常用命令

```powershell
cd D:\ws\玄芯散人IP\site
npm ci
npx vitepress dev docs --port 5173
npx vitepress build docs
```

## 改稿流程

1. git status 确认工作树干净
2. 改 docs/ 下的 md
3. npx vitepress build docs 验证，检查新增页面和侧边栏
4. git commit
5. push 前先确认，因为会立即触发线上部署

## 侧边栏

侧边栏写在 docs/.vitepress/config.mts，目前是手写的 131 条链接。新增文章必须同步加进去，否则只能靠搜索访问。

当前有 2 条死链，线上返回 404：

- /zhuji/035-which-foundation-missing → 实际文件是 035-five-years-still-lianqi.md
- /zhuji/037-data-structures-overview → 实际文件是 037-data-structure.md

## 已知问题

1. 26 组同题页面并存（52 个文件），老编号与新编号两套体系叠加，例如 jindan/09-compiler 与 jindan/061-compiler。
2. 131 条导航只覆盖部分正文，约 80 篇没有侧边栏入口。
3. 侧边栏 2 条死链，见上。

## 内容规范

正文唯一源是 docs/。写作规范见 ../content/AGENTS.md：六段式、3000-5000 字、至少一张 mermaid、修仙术语对照表。

站点正文在 GitHub 仓库 zeegoo/xren.ren，根仓库通过 .gitignore 忽略 site/，两者互不干扰。

