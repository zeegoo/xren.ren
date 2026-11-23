<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
const Layout = DefaultTheme.Layout
const { page } = useData()
const chapters = {
 lianqi: ['炼气期', '编程入门', '01'],
 zhuji: ['筑基期', '计算机基础', '02'],
 jindan: ['金丹期', '系统原理', '03'],
 yuanying: ['元婴期', '硬件底层', '04'],
 huashen: ['化神期', '创造工具', '05'],
 dujie: ['渡劫期', '行业与未来', '06']
}
const section = computed(() => page.value.relativePath.split('/')[0])
const current = computed(() => chapters[section.value])
const isArticle = computed(() => current.value && !page.value.relativePath.endsWith('/index.md'))
const utility = { system: '修炼体系', resources: '藏经阁', glossary: '术语词典', quiz: '境界测试' }
const sectionName = computed(() => current.value?.[0] || utility[page.value.relativePath.replace('.md', '')] || '修炼手记')
</script>
<template>
<Layout>
  <template #doc-before>
    <div class="document-gateway">
      <div class="gateway-trail"><a href="/">山门</a><span>/</span><a v-if="current" :href="'/'+section+'/'">{{ current[0] }}</a><span v-else>{{ sectionName }}</span><template v-if="isArticle"><span>/</span><span>修炼手记</span></template></div>
      <div class="gateway-banner"><div><span class="gateway-kicker">码农修仙传 · {{ current?.[1] || '探索计算机的内在秩序' }}</span><strong>{{ sectionName }}</strong><span class="gateway-sub">{{ isArticle ? '深入一层，理解一层。' : '循序入境，见微知著。' }}</span></div><img v-if="current" class="gateway-character" :src="'/characters/'+section+'.webp'" :srcset="'/characters/small/'+section+'.webp 320w, /characters/'+section+'.webp 640w'" sizes="152px" width="640" height="700" :alt="current[0]+'码农形象'" decoding="async"/><div v-else class="gateway-mark" aria-hidden="true">{{ current?.[2] || '玄' }}<small>修炼手记</small></div></div>
    </div>
  </template>
  <template #home-hero-image>
    <div class="chip-scene" aria-label="芯片与六重修炼境界">
      <div class="orbit orbit-one"></div><div class="orbit orbit-two"></div>
      <div class="chip-traces"></div>
      <div class="chip-core"><span class="chip-caption">CODE · SILICON · TAO</span><strong>玄芯</strong><small>从一行代码，到万物运行</small></div>
      <span class="orbit-node n1">炼气</span><span class="orbit-node n2">筑基</span><span class="orbit-node n3">金丹</span><span class="orbit-node n4">元婴</span><span class="orbit-node n5">化神</span><span class="orbit-node n6">渡劫</span>
      <div class="scene-coordinate">31° N / SYSTEM ONLINE</div>
    </div>
  </template>
  <template #not-found>
    <div class="not-found">
      <p class="nf-code">404</p>
      <h1 class="nf-title">此路不通</h1>
      <p class="nf-text">这条路上还没有功法。<br/>回山门，或者从六重境界里挑一处继续。</p>
      <div class="nf-actions"><a class="nf-primary" href="/">回山门</a><a class="nf-ghost" href="/system">看修炼体系</a></div>
      <div class="nf-realms"><a href="/lianqi/">炼气</a><a href="/zhuji/">筑基</a><a href="/jindan/">金丹</a><a href="/yuanying/">元婴</a><a href="/huashen/">化神</a><a href="/dujie/">渡劫</a></div>
    </div>
  </template>
</Layout>
</template>
