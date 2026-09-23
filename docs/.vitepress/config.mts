import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: '码农修仙传',
  description: '用修仙体系讲计算机技术成长路径',
  base: '/xren.ren/',

  // 品牌标识
  themeConfig: {
    siteTitle: '码农修仙传',

    logo: '/logo.svg',

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '修炼体系', link: '/system' },
      { text: '修炼资源', link: '/resources' },
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
            { text: '你的第一个程序：从Hello World到点灯', link: '/lianqi/04-first-program' },
            { text: '学编程到底在学什么', link: '/lianqi/05-what-to-learn' },
            { text: '从点灯到工程师：炼气期毕业标准', link: '/lianqi/06-lianqi-graduation' },
            { text: 'C语言：嵌入式工程师的母语', link: '/lianqi/07-c-language-overview' },
            { text: '变量在内存里怎么存', link: '/lianqi/08-variable-memory' },
            { text: '二进制和十六进制：计算机的唯一语言', link: '/lianqi/09-binary-hex' },
            { text: '指针到底指什么', link: '/lianqi/10-pointer-essence' },
            { text: '指针进阶：函数指针和指针数组', link: '/lianqi/11-pointer-advanced' },
            { text: '结构体：把数据打包在一起', link: '/lianqi/12-struct' },
            { text: '内存对齐：为什么sizeof不准', link: '/lianqi/13-memory-alignment' },
            { text: '宏定义和条件编译', link: '/lianqi/14-macro-conditional-compile' },
            { text: '位域和枚举', link: '/lianqi/15-bitfield-enum' },
            { text: 'C语言常见陷阱：未初始化、野指针和缓冲区溢出', link: '/lianqi/16-c-pitfalls' },
            { text: 'printf的坑：格式化字符串和整数溢出', link: '/lianqi/17-printf-pitfalls' },
            { text: '函数调用栈：从main到子函数发生了什么', link: '/lianqi/18-call-stack' },
            { text: '你的代码怎么变成可执行文件', link: '/lianqi/19-code-to-executable' },
            { text: '变量的生命周期：栈变量、全局变量和static', link: '/lianqi/20-variable-lifetime' },
            { text: '头文件到底在干什么', link: '/lianqi/21-header-files' },
            { text: '第一个Bug：程序为什么不跑', link: '/lianqi/22-first-bug-debugging' },
            { text: '数组越界：C语言最危险的Bug', link: '/lianqi/23-array-out-of-bounds' },
            { text: '程序崩了怎么看：段错误入门', link: '/lianqi/24-segfault-debugging' },
            { text: 'STM32开发环境搭建：Keil vs VS Code', link: '/lianqi/25-stm32-dev-environment' },
            { text: '点亮第一个LED：GPIO入门', link: '/lianqi/26-first-led-gpio' },
            { text: '串口输出Hello World：UART入门', link: '/lianqi/27-uart-hello-world' },
            { text: '按键输入：中断和轮询', link: '/lianqi/28-button-input-interrupt-polling' },
            { text: '定时器闪烁LED：精确延时', link: '/lianqi/29-timer-led-blink' },
            { text: '炼气期毕业项目：温度显示器', link: '/lianqi/30-temperature-monitor' },
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
            { text: '为什么有人三年还在炼气', link: '/zhuji/033-three-years-still-lianqi' },
            { text: '筑基四座地基：CS基础体系总览', link: '/zhuji/034-four-foundations' },
            { text: '筑基四座地基你缺哪一块', link: '/zhuji/035-which-foundation-missing' },
            { text: '筑基期毕业标准', link: '/zhuji/036-zhuji-graduation' },
            { text: '数据结构就是功法', link: '/zhuji/037-data-structures-overview' },
            { text: '数组vs链表：90%的人选错了', link: '/zhuji/038-array-vs-linkedlist' },
            { text: '栈和队列：先入先出还是后入先出', link: '/zhuji/039-stack-queue' },
            { text: '哈希表：用空间换时间', link: '/zhuji/040-hash-table' },
            { text: '树：从二叉树到红黑树', link: '/zhuji/041-tree-red-black' },
            { text: '图：社交网络和导航的最短路径', link: '/zhuji/042-graph-bfs-dfs-dijkstra' },
            { text: '算法复杂度：O(n)到底在说什么', link: '/zhuji/043-algorithm-complexity' },
            { text: '排序算法：十个排序你该会几个', link: '/zhuji/044-sorting-algorithms' },
            { text: 'int a=1+2在CPU里跑了几步', link: '/zhuji/045-int-a-1-plus-2-cpu-steps' },
            { text: 'CPU是怎么工作的：取指解码执行', link: '/zhuji/046-cpu-how-it-works' },
            { text: '内存Hierarchy：寄存器到硬盘的速度差', link: '/zhuji/047-memory-hierarchy' },
            { text: '从逻辑门到CPU：概念总览', link: '/zhuji/050-logic-gates-to-cpu' },
            { text: '进程vs线程：一个汉堡和十个人吃', link: '/zhuji/052-process-vs-thread' },
            { text: 'HTTP和DNS：浏览器到服务器的对话', link: '/zhuji/054-http-dns' },
            { text: 'TCP vs UDP：可靠和快速的取舍', link: '/zhuji/055-tcp-vs-udp' },
            { text: '数据库是藏经阁：SQL增删改查到B+树索引', link: '/zhuji/056-database-b-tree' },
            { text: 'Git代码时光机：版本控制入门到分支管理', link: '/zhuji/057-git-version-control' },
            { text: 'Git协作工作流：冲突解决和PR流程', link: '/zhuji/058-git-collaboration-workflow' },
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
            { text: '预处理：#include和#define的真相', link: '/jindan/62-preprocessor' },
            { text: '编译：C代码怎么变成汇编', link: '/jindan/63-compile' },
            { text: 'undefined reference：链接器原理', link: '/jindan/64-linker' },
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
            { text: '编译器是怎么造出来的：总览', link: '/huashen/127-compiler-overview' },
            { text: '词法分析器：把代码切成token', link: '/huashen/128-lexer' },
            { text: '语法分析器：递归下降和LR', link: '/huashen/129-parser' },
            { text: '语义分析：类型检查和作用域', link: '/huashen/130-semantic-analysis' },
            { text: '代码生成：从AST到汇编', link: '/huashen/131-code-generation' },
            { text: '编译优化：让生成的代码跑得更快', link: '/huashen/132-compiler-optimization' },
            { text: '数据库引擎从零开始有多难', link: '/huashen/133-database-engine-from-scratch' },
            { text: 'B+树：数据库索引的基石', link: '/huashen/134-bplus-tree' },
            { text: '事务和隔离级别：ACID不是口号', link: '/huashen/135-transaction-isolation' },
            { text: 'WAL日志：数据库崩溃恢复的原理', link: '/huashen/136-wal-crash-recovery' },
            { text: '手写迷你OS（一）：Bootloader和启动', link: '/huashen/137-mini-os-bootloader' },
            { text: '手写迷你OS（二）：内存管理', link: '/huashen/138-mini-os-memory' },
            { text: '手写迷你OS（三）：进程调度', link: '/huashen/139-mini-os-scheduler' },
            { text: '手写迷你OS（四）：Shell和系统调用', link: '/huashen/140-mini-os-shell-syscall' },
            { text: '开源社区怎么混：PR、Review、维护者', link: '/huashen/141-open-source-community' },
            { text: '读源码的正确姿势：怎么切入大项目', link: '/huashen/142-reading-source-code' },
            { text: '分布式CAP定理和Raft共识算法', link: '/huashen/143-cap-raft' },
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
            { text: '信息论：一比特有多大', link: '/dujie/153-information-theory' },
            { text: '计算机架构演进史', link: '/dujie/155-computing-architecture-evolution' },
            { text: '摩尔定律的终结', link: '/dujie/156-moores-law-end' },
            { text: '嵌入式工程师35岁危机是真的吗', link: '/dujie/159-embedded-35-crisis' },
            { text: '中国芯片突围：从设计到制造的全产业链', link: '/dujie/160-china-chip-breakthrough' },
            { text: 'RISC-V的机会和挑战：国产芯片的新路径', link: '/dujie/161-riscv-china-chip-path' },
            { text: '嵌入式行业的未来：万物互联到具身智能', link: '/dujie/162-embedded-future-iot-embodied-ai' },
            { text: '大厂vs创业公司vs外企', link: '/dujie/163-bigtech-vs-startup-vs-foreign' },
            { text: '技术人怎么赚钱：副业、创业、投资', link: '/dujie/164-tech-money-side-business-startup-investment' },
            { text: 'AI会不会取代程序员', link: '/dujie/165-ai-replace-programmers' },
            { text: '大模型原理：Transformer到底在做什么', link: '/dujie/166-transformer-llm-principle' },
            { text: 'AI推理上MCU：TFLite Micro怎么跑', link: '/dujie/167-tflite-micro-mcu' },
            { text: 'AI和嵌入式：算力芯片的战争', link: '/dujie/168-ai-embedded-chip-war' },
            { text: 'Rust重写万物', link: '/dujie/169-rust-rewrite-everything' },
            { text: '量子计算', link: '/dujie/170-quantum-computing' },
            { text: '脑机接口：碳基和硅基的融合', link: '/dujie/171-brain-computer-interface' },
            { text: 'AGI：通用人工智能还有多远', link: '/dujie/172-agi-how-far' },
            { text: '技术转管理：什么时候转，怎么转', link: '/dujie/173-tech-to-management' },
            { text: '技术领导力：怎么带团队和做架构决策', link: '/dujie/174-tech-leadership' },
            { text: '修炼永恒：终身学习不是口号是生存方式', link: '/dujie/175-lifelong-learning' },
            { text: '技术人的知识管理', link: '/dujie/176-knowledge-management' },
            { text: '读源码vs写项目', link: '/dujie/177-read-source-vs-write-project' },
            { text: '技术社区和人脉', link: '/dujie/178-tech-community-networking' },
            { text: '技术人的健康：颈椎和眼睛', link: '/dujie/179-health-cervical-eyes' },
            { text: '修炼体系全景图', link: '/dujie/28-full-map' },
            { text: '计算机科学的终极之问', link: '/dujie/29-ultimate-question' },
            { text: '码农修仙者的归宿', link: '/dujie/30-coder-destiny' },
            { text: '大道至简：回到炼气期重新出发', link: '/dujie/180-dao-to-simplicity' },
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
