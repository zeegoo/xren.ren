import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const sections = [
  ['lianqi', '炼气期', 1, 30],
  ['zhuji', '筑基期', 31, 60],
  ['jindan', '金丹期', 61, 90],
  ['yuanying', '元婴期', 91, 120],
  ['huashen', '化神期', 121, 150],
  ['dujie', '渡劫 / 大乘', 151, 180],
]

function readTitle(file) {
  const text = fs.readFileSync(file, 'utf8')
  const m = text.match(/^#\s+(.+)$/m)
  if (!m) return path.basename(file, '.md')
  return m[1].replace(/^【[^】]+】\s*/, '').trim()
}

function buildSidebar() {
  const out = {}
  for (const [dir, label, lo, hi] of sections) {
    const full = path.join(docsRoot, dir)
    if (!fs.existsSync(full)) continue
    const items = fs.readdirSync(full)
      .filter((f) => { const n = parseInt((f.match(/^(\d+)/) || [0])[0], 10); return f.endsWith('.md') && n >= lo && n <= hi })
      .map((f) => ({ f, n: parseInt((f.match(/^(\d+)/) || [0, '9999'])[1], 10) }))
      .sort((a, b) => a.n - b.n || a.f.localeCompare(b.f))
      .map(({ f }) => ({ text: readTitle(path.join(full, f)), link: '/' + dir + '/' + f.replace(/\.md$/, '') }))
    out['/' + dir + '/'] = [{ text: label, collapsible: true, items }]
  }
  return out
}

export default withMermaid(defineConfig({
  title: '码农修仙传',
  description: '用修仙体系讲计算机技术成长路径',
  themeConfig: {
    siteTitle: '码农修仙传',
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '修炼体系', link: '/system' },
      { text: '修炼资源', link: '/resources' },
      { text: '术语词典', link: '/glossary' },
      { text: '境界测试', link: '/quiz' },
    ],
    // 侧边栏：构建时扫描 docs 目录生成，新增文章无需手改
    sidebar: buildSidebar(),
    socialLinks: [
      { icon: 'github', link: 'https://xren.ren' },
    ],
    footer: {
      message: '玄芯散人 · 带你从炼气修到大乘',
      copyright: 'Copyright © 2026 玄芯散人'
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文章', buttonAriaLabel: '搜索文章' },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换' }
          }
        }
      }
    },
    outline: { level: [2, 3], label: '本篇目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },
    editLink: { pattern: 'https://xren.ren', text: '玄芯散人' }
  }
}))
