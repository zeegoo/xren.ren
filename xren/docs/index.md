---
layout: home

hero:
  name: 码农修仙传
  text: 从搬砖到飞升
  tagline: 一个嵌入式工程师，用修仙的体系，把计算机底层原理从头讲一遍。
  image:
    src: /logo.svg
    alt: 玄芯散人
  actions:
    - theme: brand
      text: 从炼气开始
      link: /lianqi/01-what-is-lianqi
    - theme: alt
      text: 先测测我的境界
      link: /quiz

features:
  - icon: 🔥
    title: 炼气期
    details: 会写代码，能跑就行。变量、循环、函数，拼凑出能用的东西。
    link: /lianqi/01-what-is-lianqi
    linkText: 进入修炼 →
  - icon: 🏗️
    title: 筑基期
    details: 开始懂原理。数据结构、操作系统、数据库、网络，四座地基打不稳后面全废。
    link: /zhuji/04-are-you-zhuji
    linkText: 进入修炼 →
  - icon: 💎
    title: 金丹期
    details: 系统级理解。编译器怎么处理你的代码，CPU缓存怎么工作，内核在干什么。
    link: /jindan/09-compiler
    linkText: 进入修炼 →
  - icon: 👶
    title: 元婴期
    details: 穿透到硬件。指令集、微架构、驱动，从一行C代码追到晶体管翻转。我的主场。
    link: /yuanying/15-instruction-set
    linkText: 进入修炼 →
  - icon: 🌟
    title: 化神期
    details: 不光用技术，开始造技术。Linus造了Linux和Git，Dennis Ritchie造了C语言。
    link: /huashen/21-create-language
    linkText: 进入修炼 →
  - icon: ⚡
    title: 渡劫 / 大乘
    details: 改变行业的人。图灵定义了计算的本质，冯·诺依曼定义了计算机的架构。
    link: /dujie/26-von-neumann
    linkText: 进入修炼 →
---

<!-- 古风字体：霞鹜文楷（CDN） + 系统楷书兜底 -->
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css" />

<!-- ============================================================
     道友档案区 - 玄芯散人
     ============================================================ -->
<div class="xren-about">
  <img class="xren-about-avatar" src="/logo.svg" alt="玄芯散人" />
  <div class="xren-about-body">
    <h3 class="xren-about-title">
      玄芯散人
      <span class="title-seal">筑基大圆满</span>
    </h3>
    <p class="xren-about-desc">
      在职嵌入式工程师，常年在寄存器与晶体管之间打滚。
      业余用修仙的体系，把计算机底层原理讲给同样迷茫过的道友。
      本命法宝：示波器、JTAG 调试器、一杯冷掉的茶。
    </p>
    <ul class="xren-about-tags">
      <li>ARM Cortex-M</li>
      <li>Linux 内核</li>
      <li>C / Rust</li>
      <li>从一行 C 到晶体管翻转</li>
      <li>修为：元婴期</li>
    </ul>
  </div>
</div>

<style>
/* ============================================================
   码农修仙传 · 古风主题
   色系：青墨 / 朱砂 / 玉青 / 鎏金
   字体：霞鹜文楷（标题）+ 系统衬线（正文）
   ============================================================ */

:root {
  /* 古风主色 */
  --xren-ink: #1F2A37;          /* 青墨 - 主文字 */
  --xren-ink-soft: #4A5568;     /* 浅墨 - 次文字 */
  --xren-cinnabar: #B23A48;     /* 朱砂 - 强调 */
  --xren-jade: #4A8C8C;         /* 玉青 - 主品牌 */
  --xren-jade-deep: #2E6B6B;    /* 深玉青 */
  --xren-gold: #C9A961;         /* 鎏金 - 高亮 */
  --xren-paper: #F5EFE0;        /* 宣纸 - 主背景 */
  --xren-paper-warm: #EFE6CF;   /* 暖宣纸 */
  --xren-rice: #FAF6E9;         /* 米色 */

  /* 古风渐变 */
  --xren-grad-primary: linear-gradient(135deg, var(--xren-jade) 0%, var(--xren-jade-deep) 100%);
  --xren-grad-warm: linear-gradient(135deg, var(--xren-cinnabar) 0%, var(--xren-gold) 100%);
  --xren-grad-ink: linear-gradient(180deg, rgba(31,42,55,0.04) 0%, rgba(74,140,140,0.04) 50%, transparent 100%);
}

/* 暗色模式（夜色修仙） */
.dark {
  --xren-ink: #E8E2D0;
  --xren-ink-soft: #A8A092;
  --xren-cinnabar: #E55A6A;
  --xren-jade: #6FBFBF;
  --xren-jade-deep: #4A8C8C;
  --xren-gold: #E0C078;
  --xren-paper: #14181F;
  --xren-paper-warm: #1A1F28;
  --xren-rice: #181C24;
}

/* 全局字体：标题古风，正文保留系统中文（保证小字清晰可读） */
:root {
  --vp-font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
  /* 主字体：霞鹜文楷优先 + 思源宋体次之 + 系统楷书兜底 */
  --xren-font-serif: "LXGW WenKai", "霞鹜文楷", "Noto Serif SC", "Source Han Serif SC", "STSong", "SimSun", serif;
  --xren-font-kai: "LXGW WenKai", "霞鹜文楷", "Noto Serif SC", "Source Han Serif SC", "KaiTi", "STKaiti", "楷体", serif;
}

/* ============================================================
   Hero 区域 - 卷轴 + 灵气
   ============================================================ */

.VPHero {
  padding-top: 2.5rem !important;
  padding-bottom: 2rem !important;
  background:
    /* 祥云光晕 */
    radial-gradient(ellipse 600px 400px at 85% 30%, rgba(74, 140, 140, 0.10) 0%, transparent 60%),
    radial-gradient(ellipse 500px 300px at 15% 70%, rgba(201, 169, 97, 0.08) 0%, transparent 60%),
    /* 底色 */
    var(--xren-grad-ink);
  position: relative;
  overflow: hidden;
}

/* 窄屏下压缩Hero */
@media (max-width: 768px) {
  .VPHero {
    padding-top: 1.5rem !important;
    padding-bottom: 1rem !important;
  }
}

/* 顶部一道鎏金分割线（卷轴意象） */
.VPHero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(80%, 800px);
  height: 2px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--xren-gold) 30%,
    var(--xren-cinnabar) 50%,
    var(--xren-gold) 70%,
    transparent 100%
  );
  opacity: 0.6;
}

/* 背景水墨晕染 + 同心圆 + 罗盘刻度 */
.VPHero::after {
  content: "";
  position: absolute;
  top: 5%;
  right: -8%;
  width: 400px;
  height: 400px;
  background:
    /* 罗盘外圈 */
    radial-gradient(circle, transparent 49.5%, rgba(201, 169, 97, 0.18) 49.8%, transparent 50.2%, transparent 53%, rgba(201, 169, 97, 0.12) 53.2%, transparent 53.5%),
    /* 罗盘中圈 */
    radial-gradient(circle, transparent 38%, rgba(74, 140, 140, 0.15) 38.3%, transparent 38.6%),
    /* 内圈光晕 */
    radial-gradient(circle, rgba(74, 140, 140, 0.10) 0%, transparent 50%);
  border-radius: 50%;
  pointer-events: none;
  animation: xren-breathe 8s ease-in-out infinite;
  /* 罗盘刻度点（8 向方位） */
  background-image:
    radial-gradient(circle at 50% 0%,   rgba(201,169,97,0.4) 0 1.5px, transparent 2px),
    radial-gradient(circle at 85% 15%, rgba(201,169,97,0.3) 0 1.5px, transparent 2px),
    radial-gradient(circle at 100% 50%, rgba(201,169,97,0.4) 0 1.5px, transparent 2px),
    radial-gradient(circle at 85% 85%, rgba(201,169,97,0.3) 0 1.5px, transparent 2px),
    radial-gradient(circle at 50% 100%, rgba(201,169,97,0.4) 0 1.5px, transparent 2px),
    radial-gradient(circle at 15% 85%, rgba(201,169,97,0.3) 0 1.5px, transparent 2px),
    radial-gradient(circle at 0% 50%,  rgba(201,169,97,0.4) 0 1.5px, transparent 2px),
    radial-gradient(circle at 15% 15%, rgba(201,169,97,0.3) 0 1.5px, transparent 2px);
  background-repeat: no-repeat;
  background-size: 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%;
}

/* 窄屏隐藏罗盘装饰 */
@media (max-width: 768px) {
  .VPHero::after {
    display: none;
  }
}

/* 左侧下方位祥云剪影 */
.VPHero .container::before {
  content: "☁";
  position: absolute;
  bottom: 12%;
  left: 4%;
  font-size: 4rem;
  color: rgba(74, 140, 140, 0.08);
  font-family: serif;
  pointer-events: none;
  animation: xren-drift 12s ease-in-out infinite;
}

@keyframes xren-breathe {
  0%, 100% { transform: scale(1) translateY(0); opacity: 1; }
  50% { transform: scale(1.08) translateY(-10px); opacity: 0.7; }
}

@keyframes xren-drift {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(20px); }
}

/* Hero 主标题 - 古风楷书 */
.VPHero .name {
  font-family: var(--xren-font-kai) !important;
  font-weight: 700 !important;
  font-size: clamp(2.5rem, 6vw, 4rem) !important;
  letter-spacing: 0.12em !important;
  background: linear-gradient(135deg,
    var(--xren-ink) 0%,
    var(--xren-jade) 50%,
    var(--xren-cinnabar) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  text-shadow: 0 0 30px rgba(74, 140, 140, 0.15);
}

.VPHero .text {
  font-family: var(--xren-font-kai) !important;
  font-weight: 400 !important;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem) !important;
  letter-spacing: 0.3em !important;
  color: var(--xren-ink-soft) !important;
  opacity: 0.85;
  margin-top: 0.5rem !important;
}

.VPHero .tagline {
  font-family: var(--xren-font-serif) !important;
  max-width: 520px !important;
  font-size: 1.05rem !important;
  line-height: 2 !important;
  letter-spacing: 0.05em;
  color: var(--xren-ink-soft) !important;
  opacity: 0.9;
  margin-top: 1.25rem !important;
  padding: 0.75rem 1.25rem;
  border-left: 3px solid var(--xren-gold);
  background: linear-gradient(90deg, rgba(201, 169, 97, 0.06), transparent);
}

/* Hero 右侧 logo - 灵气环绕 */
.VPHero .image-container {
  position: relative;
}

.VPHero .image-container::before {
  content: "";
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(circle, rgba(74, 140, 140, 0.18) 0%, transparent 50%);
  border-radius: 50%;
  animation: xren-rotate 20s linear infinite;
}

.VPHero .image-container::after {
  content: "";
  position: absolute;
  inset: -10%;
  border: 1px dashed rgba(201, 169, 97, 0.3);
  border-radius: 50%;
  animation: xren-rotate 30s linear infinite reverse;
}

@keyframes xren-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Avatar 放大（玄芯散人头像 180px） */
.VPHero .image-src {
  position: relative;
  width: 180px !important;
  height: 180px !important;
  max-width: 180px !important;
  filter: drop-shadow(0 0 24px rgba(74, 140, 140, 0.40))
          drop-shadow(0 0 8px rgba(201, 169, 97, 0.25));
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.VPHero .image-src:hover {
  transform: scale(1.05) rotate(-2deg);
}

@media (max-width: 768px) {
  .VPHero .image-src {
    width: 140px !important;
    height: 140px !important;
    max-width: 140px !important;
  }
}

/* ============================================================
   道友介绍区（Hero 与卡片之间）
   ============================================================ */

.xren-about {
  max-width: 1100px;
  margin: 1rem auto 3rem;
  padding: 1.75rem 2rem 1.5rem;
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 1.75rem;
  align-items: center;
  background:
    linear-gradient(135deg,
      rgba(245, 239, 224, 0.7) 0%,
      rgba(239, 230, 207, 0.5) 100%);
  border: 1px solid rgba(201, 169, 97, 0.35);
  border-left: 3px solid var(--xren-cinnabar);
  border-radius: 6px;
  box-shadow:
    0 4px 16px rgba(31, 42, 55, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  position: relative;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.xren-about::before {
  content: "道友档案";
  position: absolute;
  top: -10px;
  left: 1.5rem;
  padding: 0 8px;
  background: var(--xren-paper);
  font-family: var(--xren-font-kai);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--xren-cinnabar);
}

.dark .xren-about {
  background:
    linear-gradient(135deg,
      rgba(26, 31, 40, 0.7) 0%,
      rgba(20, 24, 31, 0.6) 100%);
  border-color: rgba(224, 192, 120, 0.3);
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(224, 192, 120, 0.08);
}

.dark .xren-about::before {
  background: var(--xren-paper);
}

.xren-about-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 2px solid var(--xren-gold);
  box-shadow: 0 4px 16px rgba(74, 140, 140, 0.25);
  background: var(--xren-paper);
}

.xren-about-body {
  min-width: 0;
}

.xren-about-title {
  font-family: var(--xren-font-kai) !important;
  font-size: 1.4rem !important;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--xren-ink);
  margin: 0 0 0.5rem !important;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.xren-about-title .title-seal {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #F5EFE0;
  background: linear-gradient(135deg, var(--xren-cinnabar), #8B2935);
  border: 1px solid var(--xren-gold);
  border-radius: 2px;
}

.xren-about-desc {
  font-family: var(--xren-font-serif) !important;
  font-size: 0.95rem !important;
  line-height: 1.85 !important;
  color: var(--xren-ink-soft);
  margin: 0 0 0.85rem !important;
}

.xren-about-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.xren-about-tags li {
  font-family: var(--xren-font-kai);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  padding: 3px 12px;
  border: 1px solid rgba(201, 169, 97, 0.45);
  border-radius: 14px;
  color: var(--xren-jade-deep);
  background: rgba(255, 255, 255, 0.4);
}

.dark .xren-about-tags li {
  color: var(--xren-jade);
  border-color: rgba(224, 192, 120, 0.35);
  background: rgba(20, 24, 31, 0.5);
}

@media (max-width: 640px) {
  .xren-about {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
    padding: 1.25rem 1.25rem 1rem;
  }
  .xren-about-avatar {
    width: 80px;
    height: 80px;
  }
  .xren-about-title {
    font-size: 1.15rem !important;
  }
  .xren-about-desc {
    font-size: 0.88rem !important;
  }
}

/* ============================================================
   CTA 按钮 - 加大 + 古风动效
   ============================================================ */

.VPButton {
  border-radius: 4px !important;     /* 古风方正感 */
  font-family: var(--xren-font-kai) !important;
  font-weight: 500 !important;
  letter-spacing: 0.15em !important;
  padding: 14px 28px !important;
  font-size: 1rem !important;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1) !important;
  position: relative;
  overflow: hidden;
}

.VPButton.medium {
  padding: 14px 28px !important;
  font-size: 1rem !important;
}

/* 主按钮 - 玉青朱砂 */
.VPButton.brand {
  background: var(--xren-grad-primary) !important;
  border: 1px solid var(--xren-jade-deep) !important;
  color: #F5EFE0 !important;
  box-shadow:
    0 4px 16px rgba(74, 140, 140, 0.30),
    inset 0 1px 0 rgba(255, 255, 255, 0.15) !important;
}

.VPButton.brand::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg,
    transparent 0%,
    transparent 40%,
    rgba(255, 255, 255, 0.25) 50%,
    transparent 60%,
    transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.7s ease;
}

.VPButton.brand:hover {
  transform: translateY(-2px) !important;
  box-shadow:
    0 8px 24px rgba(74, 140, 140, 0.40),
    inset 0 1px 0 rgba(255, 255, 255, 0.20) !important;
  color: #F5EFE0 !important;
}

.VPButton.brand:hover::before {
  transform: translateX(100%);
}

/* 次按钮 - 鎏金描边 */
.VPButton.alt {
  background: transparent !important;
  border: 1.5px solid var(--xren-gold) !important;
  color: var(--xren-ink) !important;
  position: relative;
}

.VPButton.alt::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--xren-grad-warm);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.VPButton.alt:hover {
  border-color: var(--xren-cinnabar) !important;
  color: #F5EFE0 !important;
  transform: translateY(-2px);
}

.VPButton.alt:hover::before {
  opacity: 1;
}

.dark .VPButton.alt {
  color: var(--xren-gold) !important;
  border-color: rgba(224, 192, 120, 0.5) !important;
}

.dark .VPButton.alt:hover {
  color: #F5EFE0 !important;
  border-color: var(--xren-gold) !important;
}

/* ============================================================
   Features 卡片 - 卷册/符箓意象
   ============================================================ */

.VPFeatures {
  padding-top: 1.5rem !important;
  padding-bottom: 4rem !important;
  position: relative;
}

/* 卡片区上方一道鎏金分割 */
.VPFeatures::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(60%, 400px);
  height: 1px;
  background: linear-gradient(90deg,
    transparent,
    var(--xren-gold) 50%,
    transparent);
  opacity: 0.5;
}

/* 不再覆盖 .items 的 display，让 VitePress 自带 flex 响应式工作。
   之前的 !important grid 把卡片挤成 109px 宽，根因已修复。 */

/* 单卡 - 卷册样式 */
.VPFeature {
  position: relative;
  border: 1.5px solid rgba(201, 169, 97, 0.45) !important;
  border-radius: 6px !important;
  background:
    linear-gradient(135deg,
      rgba(245, 239, 224, 0.6) 0%,
      rgba(239, 230, 207, 0.4) 100%) !important;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow:
    0 2px 8px rgba(31, 42, 55, 0.08),
    0 1px 3px rgba(31, 42, 55, 0.04),
    inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
  overflow: hidden;
}

.dark .VPFeature {
  background:
    linear-gradient(135deg,
      rgba(26, 31, 40, 0.7) 0%,
      rgba(20, 24, 31, 0.6) 100%) !important;
  border-color: rgba(224, 192, 120, 0.2) !important;
  box-shadow:
    0 2px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(224, 192, 120, 0.08) !important;
}

/* 卡片顶部 - 鎏金勾边 + 玉青小三角 */
.VPFeature::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg,
    var(--xren-jade) 0%,
    var(--xren-gold) 50%,
    var(--xren-cinnabar) 100%);
  opacity: 0.7;
  transition: opacity 0.3s ease, height 0.3s ease;
}

/* 卡片四角小印章装饰 */
.VPFeature::after {
  content: "印";
  position: absolute;
  top: 12px;
  right: 12px;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--xren-font-kai);
  font-size: 11px;
  font-weight: 700;
  color: var(--xren-cinnabar);
  border: 1px solid var(--xren-cinnabar);
  border-radius: 2px;
  background: rgba(178, 58, 72, 0.06);
  opacity: 0;
  transition: opacity 0.3s ease;
  letter-spacing: 0;
}

/* hover - 浮起 + 金边亮起 + 印章显现 */
.VPFeature:hover {
  transform: translateY(-6px) !important;
  border-color: var(--xren-gold) !important;
  box-shadow:
    0 16px 40px rgba(74, 140, 140, 0.18),
    0 4px 12px rgba(201, 169, 97, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
}

.dark .VPFeature:hover {
  border-color: var(--xren-gold) !important;
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(224, 192, 120, 0.15) !important;
}

.VPFeature:hover::before {
  opacity: 1;
  height: 4px;
}

.VPFeature:hover::after {
  opacity: 1;
}

/* 卡片图标 - 玉青色块 */
.VPFeature .icon {
  font-size: 1.75rem !important;
  width: 52px !important;
  height: 52px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 8px !important;
  margin-bottom: 18px !important;
  background:
    linear-gradient(135deg,
      rgba(74, 140, 140, 0.18) 0%,
      rgba(201, 169, 97, 0.12) 100%) !important;
  border: 1px solid rgba(74, 140, 140, 0.3) !important;
  filter: drop-shadow(0 2px 4px rgba(74, 140, 140, 0.2));
  transition: all 0.3s ease !important;
}

.dark .VPFeature .icon {
  background:
    linear-gradient(135deg,
      rgba(111, 191, 191, 0.18) 0%,
      rgba(224, 192, 120, 0.12) 100%) !important;
  border-color: rgba(111, 191, 191, 0.35) !important;
}

.VPFeature:hover .icon {
  transform: rotate(-5deg) scale(1.05);
  border-color: var(--xren-gold) !important;
}

/* 卡片标题 - 楷书 */
.VPFeature .title {
  font-family: var(--xren-font-kai) !important;
  font-weight: 700 !important;
  font-size: 1.25rem !important;
  letter-spacing: 0.1em !important;
  color: var(--xren-ink) !important;
  margin-bottom: 10px !important;
  position: relative;
  padding-bottom: 10px;
}

.VPFeature .title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 32px;
  height: 2px;
  background: var(--xren-grad-warm);
}

/* 卡片描述 */
.VPFeature .details {
  font-family: var(--xren-font-serif) !important;
  font-size: 0.92rem !important;
  line-height: 1.85 !important;
  letter-spacing: 0.04em;
  color: var(--xren-ink-soft) !important;
  margin-bottom: 18px !important;
}

/* 卡片链接 */
.VPFeature .link-text {
  padding-top: 4px;
}

.VPFeature .link-text-value {
  font-family: var(--xren-font-kai) !important;
  font-size: 0.92rem !important;
  letter-spacing: 0.15em !important;
  color: var(--xren-jade-deep) !important;
  display: inline-flex !important;
  align-items: center;
  gap: 4px;
  transition: gap 0.3s ease, color 0.3s ease !important;
}

.dark .VPFeature .link-text-value {
  color: var(--xren-jade) !important;
}

.VPFeature:hover .link-text-value {
  gap: 10px !important;
  color: var(--xren-cinnabar) !important;
}

.dark .VPFeature:hover .link-text-value {
  color: var(--xren-gold) !important;
}

.VPFeature .link-text-icon {
  margin-left: 0 !important;
}

/* ============================================================
   元婴期特殊高亮 - 创作者主场（鎏金满色 + 卷册印记）
   ============================================================ */

.VPFeatures .items > div:nth-child(4) .VPFeature {
  border: 1.5px solid var(--xren-gold) !important;
  background:
    linear-gradient(135deg,
      rgba(201, 169, 97, 0.16) 0%,
      rgba(178, 58, 72, 0.10) 50%,
      rgba(245, 239, 224, 0.5) 100%) !important;
  box-shadow:
    0 6px 24px rgba(201, 169, 97, 0.25),
    0 2px 8px rgba(178, 58, 72, 0.10),
    inset 0 0 0 1px rgba(201, 169, 97, 0.3),
    inset 0 0 20px rgba(201, 169, 97, 0.08) !important;
  transform: scale(1.02);
}

.VPFeatures .items > div:nth-child(4) .VPFeature::before {
  height: 4px;
  background: linear-gradient(90deg,
    var(--xren-cinnabar) 0%,
    var(--xren-gold) 50%,
    var(--xren-cinnabar) 100%);
  opacity: 1;
}

.dark .VPFeatures .items > div:nth-child(4) .VPFeature {
  background:
    linear-gradient(135deg,
      rgba(224, 192, 120, 0.14) 0%,
      rgba(229, 90, 106, 0.08) 50%,
      rgba(20, 24, 31, 0.7) 100%) !important;
}

/* "主"印章放大变金色 */
.VPFeatures .items > div:nth-child(4) .VPFeature::after {
  content: "主场";
  width: auto !important;
  height: auto !important;
  padding: 3px 8px;
  top: 14px;
  right: 14px;
  font-family: var(--xren-font-kai);
  font-size: 11px;
  font-weight: 700;
  color: #F5EFE0;
  letter-spacing: 0.15em;
  background: linear-gradient(135deg, var(--xren-cinnabar), #8B2935);
  border: 1.5px solid var(--xren-gold);
  border-radius: 2px;
  opacity: 1;
  box-shadow: 0 2px 6px rgba(178, 58, 72, 0.35);
}

/* 元婴期图标升级 */
.VPFeatures .items > div:nth-child(4) .VPFeature .icon {
  background:
    linear-gradient(135deg,
      rgba(201, 169, 97, 0.30) 0%,
      rgba(178, 58, 72, 0.18) 100%) !important;
  border: 1.5px solid var(--xren-gold) !important;
  box-shadow: 0 4px 10px rgba(201, 169, 97, 0.25);
}

.VPFeatures .items > div:nth-child(4) .VPFeature .title {
  color: var(--xren-cinnabar) !important;
}

.VPFeatures .items > div:nth-child(4) .VPFeature .title::after {
  width: 48px;
  height: 3px;
}

/* ============================================================
   卷册落款（卷X章X）
   ============================================================ */

.VPFeature .box {
  position: relative;
}

.VPFeatures .items > div:nth-child(1) .VPFeature .box::after { content: "卷一 · 启灵"; }
.VPFeatures .items > div:nth-child(2) .VPFeature .box::after { content: "卷二 · 立基"; }
.VPFeatures .items > div:nth-child(3) .VPFeature .box::after { content: "卷三 · 结丹"; }
.VPFeatures .items > div:nth-child(4) .VPFeature .box::after { content: "卷四 · 元婴 · 主场"; }
.VPFeatures .items > div:nth-child(5) .VPFeature .box::after { content: "卷五 · 化神"; }
.VPFeatures .items > div:nth-child(6) .VPFeature .box::after { content: "卷六 · 渡劫"; }

.VPFeature .box::after {
  display: block;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px dashed rgba(201, 169, 97, 0.3);
  font-family: var(--xren-font-kai);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  color: var(--xren-gold);
  opacity: 0.75;
}

.dark .VPFeature .box::after {
  border-top-color: rgba(224, 192, 120, 0.25);
}

/* ============================================================
   入场动画 + 全局微调
   ============================================================ */

.VPHome {
  padding-bottom: 0 !important;
}

.VPHomeHero {
  margin-bottom: 0 !important;
}

/* 暗色模式 Hero 背景 */
.dark .VPHero {
  background:
    radial-gradient(ellipse 600px 400px at 85% 30%, rgba(111, 191, 191, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 500px 300px at 15% 70%, rgba(224, 192, 120, 0.10) 0%, transparent 60%),
    linear-gradient(180deg, rgba(111, 191, 191, 0.06) 0%, rgba(224, 192, 120, 0.04) 50%, transparent 100%);
}

.dark .VPHero .name {
  background: linear-gradient(135deg,
    #E8E2D0 0%,
    #6FBFBF 50%,
    #E55A6A 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 让卡片在 hover 时 link icon 动起来 */
.VPFeature .link-text-icon {
  transition: transform 0.3s ease;
}

.VPFeature:hover .link-text-icon {
  transform: translateX(3px);
}
</style>

<script setup>
// 卡片入场动画 + 道友档案区位置调整
import { onMounted } from 'vue'

onMounted(() => {
  // 把道友档案区从 vp-doc 移到 VPHero 之后
  const about = document.querySelector('.xren-about');
  const hero = document.querySelector('.VPHero');
  if (about && hero && hero.parentElement) {
    hero.parentElement.insertBefore(about, hero.nextSibling);
  }

  // 卡片入场动画
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0'
        entry.target.style.transform = 'translateY(24px)'
        requestAnimationFrame(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
          entry.target.style.transitionDelay = `${i * 80}ms`
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        })
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  document.querySelectorAll('.VPFeature').forEach(el => observer.observe(el))
})
</script>