# xren.ren · VitePress 站点

> 项目路径：`/Users/zhouge/ai/xren/`
> 域名：xren.ren
> 定位：「码农修仙传」IP 的品牌入口和内容主站

---

## 目录结构

```
xren/
├── docs/
│   ├── index.md              # 首页（Hero + 六大境界卡片）
│   ├── system.md             # 修炼体系全景
│   ├── glossary.md           # 修仙术语词典
│   ├── quiz.md               # 境界测试器
│   ├── public/
│   │   └── logo.svg          # 站点 logo
│   ├── lianqi/               # 🔥 炼气期（01-03）
│   ├── zhuji/                # 🏗️ 筑基期（04-08）
│   ├── jindan/               # 💎 金丹期（09-14）
│   ├── yuanying/            # 👶 元婴期（15-20）【主场】
│   ├── huashen/             # 🌟 化神期（21-25）
│   ├── dujie/               # ⚡ 渡劫/大乘（26-30）
│   └── .vitepress/
│       └── config.mts        # 站点配置（侧边栏、导航、mermaid）
├── new.sh                    # 新建文章脚本
├── start.sh                  # 一键启动 dev server
├── package.json
└── 部署指南_香港VPS.md
```

## 常用命令

```bash
# 启动开发服务器
cd /Users/zhouge/ai/xren && bash start.sh
# 或
npx vitepress dev docs --port 5173

# 构建生产版本
npx vitepress build docs

# 新建文章占位
bash new.sh <境界> <编号> <slug> "标题"
# 示例：bash new.sh jindan 13 threading-model "线程模型与并发真相"
```

## VitePress + Mermaid 配置（已配置）

本站已安装 `vitepress-plugin-mermaid` + `mermaid`，config.mts 使用 `withMermaid()` 包装。
修改 config.mts 时，`defineConfig({` 和 `}))` 必须一起被 `withMermaid()` 包装，否则 esbuild 报错。

## 文章文件路径规则

```
docs/[境界目录]/[编号]-[slug].md
```

示例：`docs/lianqi/01-what-is-lianqi.md`

## 侧边栏配置

在 `docs/.vitepress/config.mts` 的 `sidebar` 中按境界目录注册。新建文章后必须检查侧边栏是否已添加条目。

## 写作规范

- 文章使用六段式结构（详见 `码农修仙传/AGENTS.md`）
- 篇幅 3000-5000 字
- mermaid 图表至少 1 张
- 代码块带语言标注

## 内容来源

文章正文由内容生产流程产出：
1. 大纲和草稿在 `/Users/zhouge/ai/码农修仙传/drafts/`
2. 审核通过后写入 VitePress 对应文件（覆盖空壳占位）
3. 多平台适配版本在 `/Users/zhouge/ai/码农修仙传/published/`

## 部署

参考 `部署指南_香港VPS.md`。基本流程：
```bash
npx vitepress build docs
scp -r docs/.vitepress/dist/* root@服务器IP:/var/www/xren/
```

## 品牌视觉方向

- 玄色主调（#1A3540 - #3A7A8A）
- 极简 + 大量留白
- 不用汉字做 logo（偏好图像与几何）
- 朱砂红仅作小点缀
- favicon 32-48px 仍要可识别 → 几何稳定 > 装饰细节
