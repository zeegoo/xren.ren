# 境界测试 · 你修到哪一层了？

> 别猜了，测一下。15道题，覆盖炼气到渡劫六大境界，诚实回答，结果不会骗你。

<script setup>
import { ref, computed } from 'vue'

const questions = [
  {
    id: 1,
    question: '别人让你写一个猜数字游戏（1-100），你的第一反应是？',
    options: [
      { text: '猜数字游戏是什么？', level: 'lianqi' },
      { text: 'while循环 + input + if判断，十来行代码搞定', level: 'lianqi' },
      { text: '我会用二分查找优化猜测次数', level: 'zhuji' },
    ]
  },
  {
    id: 2,
    question: '你写的程序从「点击运行」到「输出结果」，中间发生了什么？',
    options: [
      { text: '程序跑起来了，出了结果', level: 'lianqi' },
      { text: '创建进程→分配内存→加载可执行文件→CPU执行→IO输出', level: 'zhuji' },
      { text: '能讲清编译、链接、加载、虚拟内存、系统调用的每一步', level: 'jindan' },
    ]
  },
  {
    id: 3,
    question: '给你一个无序数组，找出第K大的元素，你怎么做？',
    options: [
      { text: '排序，然后取第K个', level: 'lianqi' },
      { text: '小顶堆维护K个元素，O(n log k)', level: 'zhuji' },
      { text: '能解释堆的底层实现、复杂度推导，知道快速选择的partition原理', level: 'jindan' },
    ]
  },
  {
    id: 4,
    question: 'TCP三次握手为什么是三次不是两次？',
    options: [
      { text: '不知道，但我会写HTTP接口', level: 'lianqi' },
      { text: '能解释SYN/ACK的作用和防止已失效连接', level: 'zhuji' },
      { text: '能从TCP状态机角度解释，知道TIME_WAIT和半连接队列', level: 'jindan' },
    ]
  },
  {
    id: 5,
    question: '操作系统是怎么管理内存的？',
    options: [
      { text: '不知道，程序能跑就行', level: 'lianqi' },
      { text: '知道虚拟内存、页表、缺页中断', level: 'zhuji' },
      { text: '能解释TLB、多级页表、伙伴系统、内存映射', level: 'jindan' },
    ]
  },
  {
    id: 6,
    question: '编译器对你写的代码做了什么？',
    options: [
      { text: '把代码变成能跑的程序', level: 'lianqi' },
      { text: '词法分析→语法分析→语义分析→代码生成', level: 'zhuji' },
      { text: '能讲清AST、中间表示、优化遍、目标代码生成的细节', level: 'jindan' },
    ]
  },
  {
    id: 7,
    question: 'CPU缓存L1/L2/L3是什么？',
    options: [
      { text: '不知道，跟写代码没关系', level: 'lianqi' },
      { text: '知道有三级缓存，理解局部性原理', level: 'zhuji' },
      { text: '懂缓存行、伪共享、MESI缓存一致性协议', level: 'jindan' },
    ]
  },
  {
    id: 8,
    question: '多线程程序里，两个线程同时对一个变量+1，结果一定对吗？',
    options: [
      { text: '不一定？为什么？', level: 'lianqi' },
      { text: '不对，需要加锁或用原子操作', level: 'zhuji' },
      { text: '能解释竞态条件、内存屏障、CAS、ABA问题', level: 'jindan' },
    ]
  },
  {
    id: 9,
    question: 'ARM和RISC-V有什么本质区别？',
    options: [
      { text: '不知道', level: 'lianqi' },
      { text: '知道都是RISC，但说不出细节', level: 'zhuji' },
      { text: '能从指令集设计、商业模式、生态角度分析', level: 'yuanying' },
    ]
  },
  {
    id: 10,
    question: '一段C代码，从源码到晶体管翻转，你能追到哪一步？',
    options: [
      { text: '编译成可执行文件，能跑就行', level: 'lianqi' },
      { text: '编译→汇编→机器码→CPU执行', level: 'zhuji' },
      { text: '能追到指令在流水线中的执行、寄存器操作、逻辑门、晶体管翻转', level: 'yuanying' },
    ]
  },
  {
    id: 11,
    question: '你读过Datasheet吗？遇到寄存器配置问题怎么排查？',
    options: [
      { text: '什么是Datasheet？', level: 'lianqi' },
      { text: '读过API文档，没读过芯片手册', level: 'zhuji' },
      { text: '能从Datasheet找寄存器地址、位域、Errata，配合示波器排查', level: 'yuanying' },
    ]
  },
  {
    id: 12,
    question: '中断和DMA是什么关系？',
    options: [
      { text: '不知道', level: 'lianqi' },
      { text: '知道中断是事件通知，DMA是数据搬运', level: 'jindan' },
      { text: '能配置中断优先级、ISR约束、DMA通道仲裁、Cache一致性', level: 'yuanying' },
    ]
  },
  {
    id: 13,
    question: '如果要你设计一门编程语言，从哪开始？',
    options: [
      { text: '从没想过这个问题', level: 'lianqi' },
      { text: '先定义语法，再写词法分析器和语法分析器', level: 'jindan' },
      { text: '从类型系统、语义模型、运行时设计入手，考虑GC/所有权/内存安全', level: 'huashen' },
    ]
  },
  {
    id: 14,
    question: 'Linus Torvalds 为什么被认为是技术领域的大能？',
    options: [
      { text: '知道他做了Linux，但不知道为什么厉害', level: 'lianqi' },
      { text: 'Linux内核 + Git，两个改变行业的项目', level: 'jindan' },
      { text: '能分析他的设计哲学： cathedral vs bazaar、务实主义、用数学保证历史不可篡改', level: 'huashen' },
    ]
  },
  {
    id: 15,
    question: '图灵机和冯·诺依曼架构，哪个对计算机的影响更大？',
    options: [
      { text: '不知道这两个是什么', level: 'lianqi' },
      { text: '知道是计算机的理论基础，但说不清区别', level: 'jindan' },
      { text: '图灵定义了「计算的本质」，冯·诺依曼定义了「计算机的结构」，一个理论一个工程', level: 'dujie' },
    ]
  },
]

const answers = ref({})
const submitted = ref(false)

const levelNames = {
  lianqi: '🔥 炼气期',
  zhuji: '🏗️ 筑基期',
  jindan: '💎 金丹期',
  yuanying: '👶 元婴期',
  huashen: '🌟 化神期',
  dujie: '⚡ 渡劫 / 大乘',
}

const levelDesc = {
  lianqi: '你还在炼气期。会写代码，但底层原理不太清楚。变量循环函数是三板斧，离独立做项目还差点。别急，先写完一个小项目再说。',
  zhuji: '你已筑基。懂计算机基础原理，代码到执行的大致链路说得清。数据结构、操作系统、网络四座地基有了。下一步啃编译原理和内核。',
  jindan: '你已结丹。有系统级理解，缓存、并发、内存管理这些细节能讲。不再满足于"会用"，开始想知道"为什么这么设计"。下一步穿透到硬件。',
  yuanying: '你已元婴。软件硬件两个层面能自由切换，Datasheet和示波器是日常工具。嵌入式工程师的主场。下一步该自己造东西了。',
  huashen: '你已化神。不只使用技术，开始创造技术。语言、框架、操作系统级别的东西你能设计。理解技术演进规律，有体系化判断力。',
  dujie: '你已渡劫。站到了计算机科学的顶层——图灵定义了计算的本质，冯·诺依曼定义了计算机的结构，你在思考这些根本性问题。',
}

const levelColors = {
  lianqi: '#fbbf24',
  zhuji: '#fb923c',
  jindan: '#a855f7',
  yuanying: '#3b82f6',
  huashen: '#10b981',
  dujie: '#ef4444',
}

const result = computed(() => {
  const counts = { lianqi: 0, zhuji: 0, jindan: 0, yuanying: 0, huashen: 0, dujie: 0 }
  for (const q of questions) {
    const ans = answers.value[q.id]
    if (ans) counts[ans]++
  }
  // 找到有至少2个选择的最高级别
  let maxLevel = 'lianqi'
  for (const level of ['lianqi', 'zhuji', 'jindan', 'yuanying', 'huashen', 'dujie']) {
    if (counts[level] >= 2) maxLevel = level
  }
  return { level: maxLevel, counts }
})

const answeredCount = computed(() => {
  return Object.keys(answers.value).length
})

function submit() {
  if (answeredCount.value < 10) return
  submitted.value = true
}

function reset() {
  answers.value = {}
  submitted.value = false
}
</script>

<div v-if="!submitted" class="quiz-container">
  <p class="quiz-hint">已答 {{ answeredCount }}/15 题（至少答 10 题提交）</p>
  <div v-for="q in questions" :key="q.id" class="quiz-question">
    <p class="quiz-title">{{ q.id }}. {{ q.question }}</p>
    <div v-for="(opt, idx) in q.options" :key="idx" class="quiz-option"
         :class="{ selected: answers[q.id] === opt.level }"
         @click="answers[q.id] = opt.level">
      <span class="quiz-radio" :class="{ checked: answers[q.id] === opt.level }"></span>
      <span>{{ opt.text }}</span>
    </div>
  </div>
  <button @click="submit" class="quiz-submit" :disabled="answeredCount < 10">
    提交测试
  </button>
</div>

<div v-else class="quiz-result">
  <h2 class="quiz-result-title" :style="{ color: levelColors[result.level] }">
    你的境界：{{ levelNames[result.level] }}
  </h2>
  <p class="quiz-result-desc">{{ levelDesc[result.level] }}</p>
  <div class="quiz-stats">
    <span v-for="(count, level) in result.counts" :key="level"
          class="quiz-stat-item" :class="{ active: level === result.level }">
      {{ levelNames[level] }}：{{ count }}
    </span>
  </div>
  <p class="quiz-cta">
    想突破到下一境界？去 <a href="/">xren.ren</a> 读对应的修炼文章。
  </p>
  <button @click="reset" class="quiz-submit">重新测试</button>
</div>

<style>
.quiz-container {
  max-width: 640px;
  margin: 2rem auto;
}
.quiz-hint {
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}
.quiz-question {
  margin-bottom: 1.5rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
}
.quiz-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.75rem;
}
.quiz-option {
  padding: 0.5rem 0.75rem;
  margin: 0.25rem 0;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  transition: background 0.2s;
}
.quiz-option:hover {
  background: var(--vp-c-bg-soft-up);
}
.quiz-option.selected {
  background: var(--vp-c-bg-soft-up);
}
.quiz-radio {
  width: 16px;
  height: 16px;
  border: 2px solid var(--vp-c-text-3);
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.2s;
}
.quiz-radio.checked {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-brand);
  box-shadow: inset 0 0 0 3px var(--vp-c-bg);
}
.quiz-submit {
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 2.5rem;
  background: var(--vp-c-brand);
  color: var(--vp-c-white);
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}
.quiz-submit:hover {
  opacity: 0.9;
}
.quiz-submit:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.quiz-result {
  max-width: 640px;
  margin: 2rem auto;
  padding: 2.5rem 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  text-align: center;
}
.quiz-result-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
.quiz-result-desc {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
  text-align: left;
}
.quiz-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.5rem 0;
}
.quiz-stat-item {
  padding: 4px 12px;
  font-size: 0.85rem;
  border-radius: 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-3);
}
.quiz-stat-item.active {
  background: var(--vp-c-brand);
  color: var(--vp-c-white);
}
.quiz-cta {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1.5rem;
}
.quiz-cta a {
  color: var(--vp-c-brand);
  text-decoration: underline;
}
</style>

> *本测试基于「码农修仙传」六大境界体系，结果仅供参考。真实修为请结合实际工作能力综合判断。*
