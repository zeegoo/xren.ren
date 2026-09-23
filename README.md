# 码农修仙传 · VitePress 站点

> 玄芯散人 · xren.ren · 带你从炼气修到大乘

## 快速开始

### 启动站点

双击 `start.sh`，或在终端运行：

```bash
bash start.sh
```

浏览器打开 http://localhost:5173 即可预览。按 `Ctrl+C` 停止。

### 新建文章

```bash
bash new.sh <境界> <编号> <文件名> "标题"
```

示例：

```bash
bash new.sh zhuji 05 code-to-cpu "你的代码在CPU里跑了一圈"
```

会自动生成带六段式结构的文章模板，并输出侧边栏配置提示。

可用境界：`lianqi` `zhuji` `jindan` `yuanying` `huashen` `dujie`

## 项目结构

```
code-farm-cultivation/
├── docs/
│   ├── index.md              # 首页（Hero+六大境界卡片）
│   ├── system.md             # 修炼体系全景
│   ├── glossary.md           # 修仙术语词典
│   ├── quiz.md               # 境界测试器（互动）
│   ├── public/
│   │   └── logo.svg          # 站点logo（芯片+玄字）
│   ├── lianqi/               # 🔥 炼气期文章
│   ├── zhuji/                # 🏗️ 筑基期文章
│   ├── jindan/               # 💎 金丹期文章
│   ├── yuanying/             # 👶 元婴期文章
│   ├── huashen/              # 🌟 化神期文章
│   ├── dujie/                # ⚡ 渡劫/大乘文章
│   └── .vitepress/
│       └── config.mts        # 站点配置（导航、侧边栏、搜索）
├── start.sh                  # 一键启动脚本
├── new.sh                    # 新建文章脚本
└── package.json
```

## 单篇图文六段式结构

每篇文章遵循统一模板：

1. **境界标识** — 编号+境界+阅读时间
2. **修仙引入** — 用修仙梗引入+生活化场景
3. **硬核主体** — 技术知识，用修仙体系做类比骨架
4. **修仙术语对照表** — 固定模块，每篇都有
5. **突破条件** — 总结+留悬念
6. **下期预告+互动** — 预告+评论区互动+Slogan

## 写作规范

- 每篇3000-5000字，适合掘金/知乎阅读习惯
- 代码块用三反引号标注语言
- 修仙术语对照表必须每篇都有
- 固定Slogan："我是玄芯散人，带你从炼气修到大乘"
- 文末加 `*系列导航见 [xren.ren](https://xren.ren)*`

## 部署

build静态站点：

```bash
npx vitepress build docs
```

产物在 `docs/.vitepress/dist/`，可部署到：
- Cloudflare Pages（推荐，免费）
- Vercel
- GitHub Pages

绑域名 `xren.ren` 到部署平台即可上线。
