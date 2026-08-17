#!/bin/bash
# 码农修仙传 - 新建文章脚本
# 用法：bash new.sh <境界> <编号> <文件名> <标题>
# 示例：bash new.sh zhuji 05 code-to-cpu "你的代码在CPU里跑了一圈"

cd "$(dirname "$0")/docs"

REALM="$1"
NUM="$2"
SLUG="$3"
TITLE="$4"

if [ -z "$REALM" ] || [ -z "$NUM" ] || [ -z "$SLUG" ] || [ -z "$TITLE" ]; then
    echo "用法: bash new.sh <境界> <编号> <文件名> <标题>"
    echo "示例: bash new.sh zhuji 05 code-to-cpu \"你的代码在CPU里跑了一圈\""
    echo ""
    echo "可用境界: lianqi zhuji jindan yuanying huashen dujie"
    exit 1
fi

REALM_NAMES="lianqi:炼气 zhuji:筑基 jindan:金丹 yuanying:元婴 huashen:化神 dujie:渡劫"
REALM_NAME=$(echo "$REALM_NAMES" | tr ' ' '\n' | grep "^$REALM:" | cut -d: -f2)
if [ -z "$REALM_NAME" ]; then
    echo "❌ 未知境界: $REALM"
    echo "可用: lianqi zhuji jindan yuanying huashen dujie"
    exit 1
fi

# 数字前缀补零
PREFIX=$(printf "%02d" "$NUM")
FILENAME="${PREFIX}-${SLUG}.md"
FILEPATH="${REALM}/${FILENAME}"

if [ -f "$FILEPATH" ]; then
    echo "❌ 文件已存在: $FILEPATH"
    exit 1
fi

# 创建文章模板
cat > "$FILEPATH" << EOF
# 【${REALM_NAME}·${NUM}】${TITLE}

> **码农修仙传 · ${REALM_NAME}期 · 第${NUM}篇**
> 我是玄芯散人，带你从炼气修到大乘。

---

## 境界标识

\`\`\`
╔══════════════════════════════════╗
║     ${REALM_NAME}期 · 第${NUM}篇               ║
║     ${TITLE}
║     预计阅读：X分钟               ║
╚══════════════════════════════════╝
\`\`\`

---

## 修仙引入

<!-- 用修仙梗引入+生活化场景抓注意力 -->

---

## 硬核主体

<!-- 讲技术知识，用修仙体系做类比骨架 -->

---

## 修仙术语对照表

| 修仙概念 | 技术现实 | 一句话解释 |
|---------|---------|-----------|
| | | |

---

## 突破条件

<!-- 给出「突破到下一境界」的条件 -->

---

## 下期预告 + 互动

> **下一篇：【${REALM_NAME}·$((NUM+1))】标题待定**

现在问你：**你现在处于哪个境界？** 评论区聊聊。

> 我是玄芯散人，带你从炼气修到大乘。

---

*本文是「码农修仙传」系列第${NUM}篇。系列导航见 [xren.ren](https://xren.ren)*
EOF

echo "✅ 文章已创建: docs/$FILEPATH"
echo "📝 标题: 【${REALM_NAME}·${NUM}】${TITLE}"
echo ""
echo "⚠️  记得在 docs/.vitepress/config.mts 的侧边栏中添加此文章链接"
