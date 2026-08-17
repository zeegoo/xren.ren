# 境界测试

> 你到底是哪个段位？别猜了，测一下。

<script setup>
import { ref, computed } from 'vue'

const questions = [
  {
    id: 1,
    question: '给你一个无序数组，找出第K大的元素，你怎么做？',
    options: [
      { text: '排序，然后取第K个', level: 'lianqi' },
      { text: '用小顶堆，维护K个元素，O(n log k)', level: 'zhuji' },
      { text: '我能解释堆的底层实现和复杂度推导', level: 'jindan' },
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
    question: 'TCP三次握手为什么是三次不是两次？',
    options: [
      { text: '不知道，但我会写HTTP接口', level: 'lianqi' },
      { text: '能解释SYN/ACK的作用和防止已失效连接的方式', level: 'zhuji' },
      { text: '能从TCP状态机角度解释，知道TIME_WAIT和半连接队列', level: 'jindan' },
    ]
  },
  {
    id: 4,
    question: 'CPU缓存L1/L2/L3是什么？',
    options: [
      { text: '不知道，跟写代码没关系', level: 'lianqi' },
      { text: '知道有三级缓存，理解局部性原理', level: 'zhuji' },
      { text: '懂缓存行、伪共享、缓存一致性协议', level: 'jindan' },
    ]
  },
  {
    id: 5,
    question: 'ARM和RISC-V有什么本质区别？',
    options: [
      { text: '不知道', level: 'lianqi' },
      { text: '知道都是RISC，但说不出细节', level: 'zhuji' },
      { text: '能从指令集设计、商业模式、生态角度分析', level: 'yuanying' },
    ]
  },
  {
    id: 6,
    question: '一段C代码，从源码到晶体管翻转，你能追到哪一步？',
    options: [
      { text: '编译成可执行文件，能跑就行', level: 'lianqi' },
      { text: '编译→汇编→机器码→CPU执行', level: 'zhuji' },
      { text: '能追到指令在流水线中的执行、寄存器操作、总线信号', level: 'yuanying' },
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
}

const levelDesc = {
  lianqi: '你还在炼气期——会写代码，但对底层原理理解不够。建议系统学习数据结构、操作系统、网络等计算机基础。方向：筑基。',
  zhuji: '你已筑基——懂计算机基础原理，能讲清代码到执行的大致链路。下一步是深入理解编译原理、操作系统内核、计算机体系结构。方向：结丹。',
  jindan: '你已结丹——有系统级理解，能深入到缓存、状态机等细节。下一步是穿透到硬件层面。方向：元婴。',
  yuanying: '你已元婴——能穿透软件和硬件的边界，在两个层面自由切换。这是嵌入式工程师的主场境界。方向：化神。',
}

const result = computed(() => {
  const counts = { lianqi: 0, zhuji: 0, jindan: 0, yuanying: 0 }
  for (const q of questions) {
    const ans = answers.value[q.id]
    if (ans) counts[ans]++
  }
  // 找到最高境界（有至少2个选择的最高级别）
  let maxLevel = 'lianqi'
  for (const level of ['lianqi', 'zhuji', 'jindan', 'yuanying']) {
    if (counts[level] >= 2) maxLevel = level
  }
  return { level: maxLevel, counts }
})

function submit() {
  submitted.value = true
}

function reset() {
  answers.value = {}
  submitted.value = false
}
</script>

<div v-if="!submitted" class="quiz-container">
  <div v-for="q in questions" :key="q.id" class="quiz-question">
    <p class="quiz-title">{{ q.id }}. {{ q.question }}</p>
    <div v-for="opt in q.options" :key="opt.level" class="quiz-option">
      <label>
        <input type="radio" :name="'q' + q.id" :value="opt.level" v-model="answers[q.id]" />
        {{ opt.text }}
      </label>
    </div>
  </div>
  <button @click="submit" class="quiz-submit">提交测试</button>
</div>

<div v-else class="quiz-result">
  <h2 style="text-align: center; color: #6B46C1;">你的境界：{{ levelNames[result.level] }}</h2>
  <p style="text-align: center; font-size: 1.1rem; margin: 1rem 0;">{{ levelDesc[result.level] }}</p>
  <div class="quiz-stats">
    <span>炼气：{{ result.counts.lianqi }}</span>
    <span>筑基：{{ result.counts.zhuji }}</span>
    <span>金丹：{{ result.counts.jindan }}</span>
    <span>元婴：{{ result.counts.yuanying }}</span>
  </div>
  <button @click="reset" class="quiz-submit">重新测试</button>
</div>

<style>
.quiz-container {
  max-width: 640px;
  margin: 2rem auto;
}
.quiz-question {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.quiz-title {
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 1rem;
}
.quiz-option {
  padding: 0.5rem 0;
}
.quiz-option label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.quiz-submit {
  display: block;
  margin: 2rem auto;
  padding: 0.75rem 2rem;
  background: #6B46C1;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}
.quiz-submit:hover {
  background: #553C9A;
}
.quiz-result {
  max-width: 640px;
  margin: 2rem auto;
  padding: 2rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}
.quiz-stats {
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
  font-weight: 600;
}
</style>

> *本测试基于「码农修仙传」六大境界体系，结果仅供参考。真实修为请结合实际工作能力综合判断。*
