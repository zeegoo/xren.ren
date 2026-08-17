import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: '码农修仙传',
  description: '用修仙体系讲计算机技术成长路径',

  // 品牌标识
  themeConfig: {
    siteTitle: '码农修仙传',

    logo: '/logo.svg',

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '修炼体系', link: '/system' },
      { text: '术语词典', link: '/glossary' },
      { text: '境界测试', link: '/quiz' },
    ],

    // 侧边栏 - 按境界分类
    sidebar: {
      '/lianqi/': [
        {
          text: '炼气期',
          collapsible: true,
          items: [
            { text: '炼气期码农长什么样', link: '/lianqi/01-what-is-lianqi' },
            { text: '你处于哪个阶段', link: '/lianqi/02-which-stage' },
            { text: '为什么有人三个月筑基', link: '/lianqi/03-fast-breakthrough' },
          ]
        }
      ],
      '/zhuji/': [
        {
          text: '筑基期',
          collapsible: true,
          items: [
            { text: '你已经筑基了吗', link: '/zhuji/04-are-you-zhuji' },
            { text: '代码从写完到CPU执行', link: '/zhuji/05-code-to-cpu' },
            { text: '数据结构就是功法', link: '/zhuji/06-data-structure-gongfa' },
            { text: '操作系统是天道规则', link: '/zhuji/07-os-tiandao' },
            { text: '网络是传送阵', link: '/zhuji/08-network-array' },
          ]
        }
      ],
      '/jindan/': [
        {
          text: '金丹期',
          collapsible: true,
          items: [
            { text: '编译器对你代码做了什么', link: '/jindan/09-compiler' },
            { text: '操作系统内核是天道规则', link: '/jindan/10-kernel-tiandao' },
            { text: '为什么金丹期看代码像开天眼', link: '/jindan/11-tianyan' },
            { text: 'CPU缓存三层塔', link: '/jindan/12-cache-tower' },
            { text: '线程模型与并发真相', link: '/jindan/13-threading-model' },
            { text: '内存管理：堆栈的灵力分配', link: '/jindan/14-memory-management' },
          ]
        }
      ],
      '/yuanying/': [
        {
          text: '元婴期',
          collapsible: true,
          items: [
            { text: 'CPU指令集是天地法则', link: '/yuanying/15-instruction-set' },
            { text: '从C代码到晶体管翻转', link: '/yuanying/16-c-to-transistor' },
            { text: '为什么嵌入式工程师天生在元婴期', link: '/yuanying/17-embedded-yuanying' },
            { text: 'ARM vs RISC-V大战', link: '/yuanying/18-arm-vs-riscv' },
            { text: '驱动开发：沟通硬件的御灵术', link: '/yuanying/19-driver-dev' },
            { text: '固件：开天辟地前最后一道工序', link: '/yuanying/20-firmware' },
          ]
        }
      ],
      '/huashen/': [
        {
          text: '化神期',
          collapsible: true,
          items: [
            { text: '创造编程语言需要什么', link: '/huashen/21-create-language' },
            { text: 'Linus为什么是化神大能', link: '/huashen/22-linus' },
            { text: '从写代码到造语言', link: '/huashen/23-code-to-language' },
            { text: '操作系统是怎么炼成的', link: '/huashen/24-build-os' },
            { text: '框架设计的道与术', link: '/huashen/25-framework-design' },
          ]
        }
      ],
      '/dujie/': [
        {
          text: '渡劫 / 大乘',
          collapsible: true,
          items: [
            { text: '冯·诺依曼架构', link: '/dujie/26-von-neumann' },
            { text: '图灵机', link: '/dujie/27-turing-machine' },
            { text: '修炼体系全景图', link: '/dujie/28-full-map' },
            { text: '计算机科学的终极之问', link: '/dujie/29-ultimate-question' },
            { text: '码农修仙者的归宿', link: '/dujie/30-coder-destiny' },
          ]
        }
      ],
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://xren.ren' },
    ],

    // 页脚
    footer: {
      message: '玄芯散人 · 带你从炼气修到大乘',
      copyright: 'Copyright © 2026 玄芯散人'
    },

    // 搜索
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文章',
            buttonAriaLabel: '搜索文章'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    // 大纲
    outline: {
      level: [2, 3],
      label: '本篇目录'
    },

    // 文档页脚
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    // 最后一页更新时间
    lastUpdated: {
      text: '最后更新于'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://xren.ren',
      text: '玄芯散人'
    }
  }
}))
