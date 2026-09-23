# 【金丹·87】静态库和动态库：编译、链接和加载

> 码农修仙传 · 金丹期 · 第87篇
> 我是玄芯散人，带你从炼气修到大乘。

---

## 境界标识

```
╔══════════════════════════════════╗
║     金丹期 · 第87篇              ║
║     静态库和动态库                ║
║     ar / gcc -shared -fPIC      ║
║     dlopen / dlsym / soname     ║
║     预计阅读：28 分钟              ║
╚══════════════════════════════════╝
```

---

## 修仙引入

066 那篇把链接报错的五种情境摸过一遍，也顺嘴提了一句静态库 vs 动态库的命令长什么样。这一篇算「认门」，弟子看完知道 `ar rcs` 能打 `.a`、`gcc -shared -fPIC` 能出 `.so`。认完了门，再往里走一寸发现全是问题：库怎么被打包出来的，符号怎么决定谁能看见外头，库的版本号怎么让江湖上无数弟子同时跑着不打架，程序跑起来后又怎么临场把一个库拉进进程里。

修真界把这一关叫「炼器」。064 讲的是「矿石怎么熔」的理论，066 讲的是「铸完发现裂了怎么办」的补救。087 要讲四件事：先把矿石提纯，再把料铸成灵器，再教弟子战场上临阵拔刀，最后给灵器登记门牌。这一篇把库的制作端和运行时加载端拆开看一遍。

---

## 硬核主体

### 066 静态库 vs 动态库回顾：本篇要往哪里走

066 在「静态库 vs 动态库：链接行为的实战差异」那一节里写过两个命令，一个是 `ar rcs libfoo.a foo.o bar.o baz.o`，一个是 `gcc -fPIC -shared foo.c -o libfoo.so`。066 那一篇算把「使用端」点到了。

可 066 没碰的是「制作端」。弟子把 `foo.c` 写成 `.o`，再用 `ar` 把若干 `.o` 打成一个 `.a`，这一段过程 066 没展开。「`ar` 的 `rcs` 三个选项分别什么意思」「为什么做出来的 `.so` 必须用 `-fPIC`」「`dlopen` 跟普通的链接有什么区别」「符号表里那么一大片函数，哪些会被别人看见，哪些不会」「soname 这个名字到底管什么用」。这些 066 没答。

修真比喻：066 是修真界的「辨器」课，弟子学会了认出剑与刀的区别。087 是「铸器」课，弟子从铸剑到磨刀到拔刀到上户口，每一步都要看一遍。

### 静态库的制作：`ar` 把 `.o` 打成 `.a`

修真界里 `.a` 文件实际上是若干 `.o` 的归档。归档这个动作不需要链接器，只需要 `ar`（archive）这一把工具。`ar` 是 GNU binutils 里的老工具，比 gcc 还老，专门做「把多个文件打成一捆」这件事。

修真界里最常用的命令长这样：

```bash
# 先编译每个 .c 成 .o（-c 表示只编译不链接）
$ gcc -c add.c sub.c mul.c

# 用 ar 把三个 .o 打成一个静态库
# rcs 三个字母分别是：r=替换/插入、c=创建归档、s=写索引
$ ar rcs libmath.a add.o sub.o mul.o
```

修真界里 `ar rcs` 三个选项各管一摊事。`r`（replace/insert）把同名成员替换掉，没有就插入。`c`（create）归档不存在就创建。`s`（write index）写一份符号索引，让链接器能从归档里直接定位「哪个 `.o` 定义了哪个符号」，不用全表扫描。这三个选项捆在一起用是标准做法，少了 `s` 链接器会慢很多，少了 `c` 第一次创建会失败。

修真界里还有几个常用的子命令值得记：

```bash
# t：列出归档里的所有成员
$ ar t libmath.a
add.o
sub.o
mul.o

# x：把成员抽出来
$ ar x libmath.a add.o

# d：删除成员
$ ar d libmath.a mul.o

# --help 看所有选项
$ ar --help
```

修真界里 `.a` 文件的物理格式很简单，就是把每个 `.o` 原封不动贴一起，前面加一个简单的全局头（叫 `/` 这个特殊成员）。所以 `.a` 里的 `.o` 跟磁盘上独立的 `.o` 在 ELF 视图里是完全等价的，链接器看到 `-lfoo` 时会从 `libfoo.a` 里挑出能解决当前未定义符号的那个 `.o`，整段整段塞进可执行文件。

修真界里做一组动手演示，把三个 `.o` 打成一个静态库，再链接出可执行文件：

```c
// math.h
int add(int a, int b);
int sub(int a, int b);

// add.c
#include "math.h"
int add(int a, int b) { return a + b; }

// sub.c
#include "math.h"
int sub(int a, int b) { return a - b; }
```

```c
// main.c
#include <stdio.h>
#include "math.h"

int main(void) {
    printf("%d\n", add(3, 4));   // 期望 7
    printf("%d\n", sub(10, 3)); // 期望 7
    return 0;
}
```

```bash
$ gcc -c add.c sub.c
$ ar rcs libmath.a add.o sub.o
$ gcc main.c -L. -lmath -o app
$ ./app
7
7
```

修真界里 `-L.` 把当前目录加进库的搜索路径，`-lmath` 是「找 `libmath.a` 或 `libmath.so`」的简写。链接器按顺序扫描，发现 `add` 和 `sub` 两个未定义符号都能在 `libmath.a` 里解决，就把对应的 `.o` 整个拉进可执行文件。066 已经讲过库顺序的细节（被依赖的库要放后面），本篇不重复。

修真比喻：静态库是修真界的「手抄本」，弟子把宗门功法一页页抄一份揣身上，副本多就占地方。动态库是修真界的「玉简传功」，所有人到宗门同一个玉简那里读取，省地方但宗门得一直开着。

### 动态库的制作：`gcc -shared -fPIC` 出 `.so`

修真界里 `.a` 是装订成册的印本，`.so` 不一样。`.so` 里的代码要在运行时被加载到任意地址，还要在多个进程之间共享同一份物理页。所以制作 `.so` 时有两件事比 `.a` 多一步。

第一件，加 `-shared` 让 gcc 调链接器产出动态库而不是可执行文件。第二件，加 `-fPIC`（Position Independent Code，位置无关代码）让编译器生成的代码用相对地址访问，不依赖加载地址。这两件事拆开说：

```bash
# 第一步：编译时加 -fPIC，生成位置无关的 .o
$ gcc -c -fPIC add.c sub.c

# 第二步：链接时加 -shared，产出 .so
$ gcc -shared -o libmath.so add.o sub.o

# 也可以一步到位
$ gcc -fPIC -shared add.c sub.c -o libmath.so
```

修真界里 `-fPIC` 单独写是给编译器听的，`-shared` 单独写是给链接器听的。两件事可以合在一条命令里，但语义上各管各的：`-fPIC` 决定代码生成，`-shared` 决定最终产物类型。把这两件事分清楚，写 CMakeLists 或者 Makefile 时就不会迷糊。

修真界里做出来的 `.so` 可以用 `file` 看一眼：

```bash
$ file libmath.so
libmath.so: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, ...
```

修真界里这条输出里的「shared object」就是动态库的 ELF 类型缩写，跟可执行文件的「executable」是两回事。

修真比喻：动态库是修真界的「玉简传功」，弟子不揣走原件，需要时去宗门玉简那里抄阅。宗门里只有一份原件，所有弟子都对着同一份读，省地方，但要靠宗门一直开着。

### 为什么需要 `-fPIC`：修真界的「坐标重写」

修真界里 `-fPIC` 看着像一个可有可无的开关，实际上是动态库的硬性要求。这事得从代码怎么访问「自己」讲起。

修真界里一段普通的 C 代码如果要访问一个全局变量，比如 `int counter = 0; counter += 1;`，编译器会生成这样的指令：

```asm
mov rax, [rip + 0x2a3a]   ; 把 0x2a3a 当成「counter 的地址」
add dword [rax], 1
```

修真界里麻烦出在两处。第一处是函数调用别的函数。如果函数 A 在编译时知道 B 在自己前方 100 字节的位置，编译器会生成 `call 0x401050` 这种「绝对地址调用」。代码段被加载到 `0x401050` 上没问题，加载到 `0x7f0000001000` 上就跳错了。第二处是访问函数自身的地址（拿函数指针等），这事在 C 代码里少碰，但编译器内部实现「可重入」代码时绕不开。

修真界里 `-fPIC` 就是为这两处准备的。GCC 的做法是把代码里所有「跳到固定地址」的地方改成「先查一张表（GOT, Global Offset Table），表里的地址再指过去」。`.so` 加载到内存时，动态链接器（`ld-linux.so`）负责把这张表填好。所以叫「位置无关」：代码本身不写死任何绝对地址，全靠 GOT 中转，加载到哪都能跑。

修真界里 32 位 x86 上还有更复杂的麻烦。32 位没法用 RIP 相对寻址访问数据，必须先算出 GOT 的地址再取数据。GCC 在 32 位上用 `ebx` 寄存器专门存 GOT 的地址，每个函数入口都得做 `call __x86.get_pc_thunk.bx; add ebx, ...` 这种开胃菜，开销比 64 位大一截。所以 64 位上偶尔有人想省一点性能会加 `-fno-pic`，但开了会带来额外开销，不建议这么干。

修真比喻：修真界的功法书页是用相对坐标写的，「前三行」「下面第七行」这种描述，不写「第 401050 页」。分舵把书页放在哪都一样读。`-fPIC` 是修真界的「坐标重写法」，把书页从绝对页码改成相对坐标，不重写法直接拿过去读，分舵挪个位置就全错位了。

### `dlopen` / `dlsym` / `dlerror` / `dlclose`：修真界的临阵拔刀

修真界里前面的 `.so` 用法都假设「编译时知道要链接哪个库」。可修真界里还有一类用法：编译时完全不知道程序会用到哪个库，要等运行时才决定。比如一个播放器，支持的编码格式由用户在配置文件里指定。比如一个 Web 服务器，第三方模块以 `.so` 文件形式放在某个目录里，服务器启动时扫一遍目录，把每个 `.so` 都拉进来。比如 Python 的 C 扩展、Emacs 的 dynamic module，都走这条路。

修真界里这条路叫「动态加载」（dynamic loading），POSIX 标准给了四个函数：

```c
#include <dlfcn.h>

void *dlopen(const char *pathname, int mode);
void *dlsym(void *handle, const char *symbol);
int   dlclose(void *handle);
char *dlerror(void);
```

修真界里这四个函数的分工很清楚。`dlopen` 打开一个 `.so`，返回一个不透明的句柄（handle）。`dlsym` 在句柄里查一个符号，返回它的地址（强转成函数指针用）。`dlclose` 关掉句柄，引用计数减一，引用归零时真的卸载。`dlerror` 返回最近一次失败的错误信息，没失败就返 `NULL`。

修真界里 `dlopen` 的第二个参数 `mode` 有两个最常用的值：`RTLD_LAZY`（函数引用延迟到第一次调用时才解析）和 `RTLD_NOW`（`dlopen` 调用时立刻把全部符号解析完）。`RTLD_LAZY` 效率更高但风险是漏网的符号错误要到运行时才暴露；`RTLD_NOW` 启动慢一点但出错立刻现形。实际项目里推荐用 `RTLD_NOW`，启动时报错比跑到一半崩溃好排查得多。`RTLD_GLOBAL` 让这个库导出的符号进入全局命名空间，`RTLD_LOCAL`（默认）把符号限制在本库内。

修真界里把四个函数串起来写一段标准的「插件加载器」：

```c
// plugin_loader.c
#include <dlfcn.h>
#include <stdio.h>
#include <stdlib.h>

typedef int (*plugin_init_fn)(void);
typedef int (*plugin_run_fn)(const char *arg);

int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "用法: %s <plugin.so>\n", argv[0]);
        return 1;
    }

    // RTLD_NOW 让所有未定义符号当场报错
    void *handle = dlopen(argv[1], RTLD_NOW);
    if (!handle) {
        fprintf(stderr, "dlopen 失败: %s\n", dlerror());
        return 1;
    }

    // 清掉 dlopen 可能产生的错误信息
    dlerror();

    // 取两个符号：初始化函数和运行函数
    plugin_init_fn init = (plugin_init_fn)dlsym(handle, "plugin_init");
    const char *err = dlerror();
    if (err) {
        fprintf(stderr, "找 plugin_init 失败: %s\n", err);
        dlclose(handle);
        return 1;
    }

    plugin_run_fn run = (plugin_run_fn)dlsym(handle, "plugin_run");
    err = dlerror();
    if (err) {
        fprintf(stderr, "找 plugin_run 失败: %s\n", err);
        dlclose(handle);
        return 1;
    }

    if (init() != 0) {
        fprintf(stderr, "插件初始化失败\n");
        dlclose(handle);
        return 1;
    }

    int rc = run("hello world");
    printf("插件返回 %d\n", rc);

    dlclose(handle);
    return 0;
}
```

```c
// plugin_hello.c（要编译成 libhello.so）
#include <stdio.h>

int plugin_init(void) {
    printf("hello 插件初始化\n");
    return 0;
}

int plugin_run(const char *arg) {
    printf("hello 插件跑起来: %s\n", arg);
    return 0;
}
```

```bash
$ gcc -fPIC -shared plugin_hello.c -o libhello.so
$ gcc plugin_loader.c -o plugin_loader -ldl
$ ./plugin_loader ./libhello.so
hello 插件初始化
hello 插件跑起来: hello world
hello 插件返回 0
```

修真界里 `-ldl` 是链接 `libdl.so`，那一行提供 `dlopen` / `dlsym` 等函数的实现。`dlsym` 还有两个特殊句柄：`RTLD_DEFAULT` 按默认搜索顺序查找符号，`RTLD_NEXT` 从当前库之后的库开始查，常用于「hook 别人的函数」。`LD_PRELOAD` 那种劫持 `malloc` 的玩法，靠的就是 `RTLD_NEXT`。

修真比喻：动态加载是修真界的「临阵拔刀」。弟子进山门前不知道会遇上哪种妖兽，出招前也没法把刀库全背在身上。临场从百宝囊（`dlopen`）里掏一把刀（`dlsym`），用完塞回去（`dlclose`）。掏错刀（找不到符号）百宝囊会吐一张小纸条（`dlerror`）说明白到底哪儿错了。

### 符号可见性：修真界的「谁能看见这把剑」

修真界里编译出来的 `.so` 文件里，所有「非 static」的 C 函数和非 static 全局变量，默认都进了动态符号表。这意思是：`nm -D libfoo.so` 默认能看到一堆符号，全是公开的。

修真界里这背后有三个问题。第一个问题，库里某些「只给自己用」的辅助函数被暴露出来，使用方一不小心声明了同名函数就冲突了，C++ 名字修饰（name mangling）不一致时尤其乱。第二个问题，库里任何内部数据结构一改，整个库的 ABI（二进制接口约定）就变了，所有依赖这个库的可执行文件都得重编译。第三个问题，符号表越大，动态链接器解析时间越长，库启动越慢。

修真界里要修这三件事，根子是「符号可见性」（symbol visibility）。可见性有四种值，GCC 上是 `default`、`hidden`、`internal`、`protected`：

| 值 | 行为 |
|----|------|
| `default` | 默认，符号进入动态符号表，别人能看见 |
| `hidden` | 符号不进动态符号表，外部看不见，但函数内仍可调 |
| `internal` | 比 hidden 还严，汇编阶段就当本地符号用 |
| `protected` | 符号被导出，但同一库内调用不经过 PLT，性能更好 |

修真界里最常用的一招是把整个库默认设成 hidden，再单独挑几个想暴露的函数设成 default。这是「白名单」模式，比默认全暴露再单挑隐藏（「黑名单」模式）安全得多。

写法上用编译参数 `-fvisibility=hidden` 给整个编译单元默认隐藏，再用 `__attribute__((visibility("default")))` 给单个函数开窗。实际项目里更常见的做法是用「导出宏」收敛到一个头文件，方便跨 Windows / Linux 维护：

```c
// foo_export.h
#ifdef _WIN32
#  define FOO_EXPORT __declspec(dllexport)
#else
#  define FOO_EXPORT __attribute__((visibility("default")))
#endif

int FOO_EXPORT public_api(int x);
```

这种宏叫 `FOO_EXPORT`（命名按库名走），库的每个公开函数都加这个宏，内部函数一个都不加。 `-fvisibility=hidden` 作为全局开关配上 `FOO_EXPORT` 作为白名单，是工业界做公共库的标准做法。Linux 上 glibc、各大开源 C 库都这么写。Windows 上没有 visibility 属性，用的是 `__declspec(dllexport)` / `__declspec(dllimport)`，宏就是为了在两边都写一份兼容代码。

修真比喻：可见性是修真界的「传功规矩」。宗门里有些功法可以外传（default），有些只能内部弟子修（hidden）。如果不分清楚，外面弟子胡乱喊一招内部功法的名字，要么没人应答（链接报错），要么窜了真法走火入魔（ABI 不兼容崩溃）。修真界正经宗门的规矩是「外传的有目录，内部的不出声」，这套规矩在 gcc 上叫 `-fvisibility=hidden` + 白名单宏。

### soname：动态库的「身份证号」

修真界里 `.so` 文件的「名字」比想象复杂。一个 `.so` 实际有三种名字：`real name`、`soname`、`linker name`。三者的关系修真界里必须搞清楚。

修真界里 `real name` 是磁盘上文件的真名，必须带主版本+次版本+修订号的命名，例如 `libfoo.so.1.0.0`。这一段是文件物理实体，动态链接器加载时按这个名字找文件。`soname` 是「库的身份号」，记录在 `.so` 文件的 `.dynamic` 段里的 `DT_SONAME` 字段里，例如 `libfoo.so.1`。可执行文件的「我需要哪些 `.so`」清单里（DT_NEEDED），登记的是 soname 不是 real name。这一招让 soname 在 bug fix 升级（比如 `libfoo.so.1.0.0` 替换为 `libfoo.so.1.0.5`）时不用动可执行文件。`linker name`（也叫 developer name）是编译时 `-lfoo` 找的那个名字，比如 `libfoo.so`，通常是个符号链接指向 `soname` 或 `real name`。

修真界里三者的关系画出来：

```mermaid
flowchart LR
    subgraph 编译期
        direction TB
        A[gcc main.c -lfoo] --> B[链接器找<br/> libfoo.so]
        B --> C[符号链接]
        C --> D[libfoo.so.1<br/> soname]
        D --> E[libfoo.so.1.0.0<br/> real name]
    end
    subgraph 运行期
        direction TB
        F[可执行文件<br/> DT_NEEDED=libfoo.so.1] --> G[ld-linux.so<br/> 找 soname]
        G --> H[/usr/lib/libfoo.so.1]
        H --> I[libfoo.so.1.0.0]
    end
    style A fill:#3A7A8A,color:#fff
    style F fill:#3A7A8A,color:#fff
    style E fill:#3A7A8A,color:#fff
    style I fill:#3A7A8A,color:#fff
```

修真界里给库设 soname 的做法是是在链接时加 `-Wl,-soname`：

```bash
$ gcc -fPIC -shared -Wl,-soname,libmath.so.1 add.c sub.c -o libmath.so.1.0.0

# 查看 soname
$ readelf -d libmath.so.1.0.0 | grep SONAME
 0x000000000000000e (SONAME)    Library soname: [libmath.so.1]

# 创建 soname 符号链接（修真界约定俗成）
$ ln -s libmath.so.1.0.0 libmath.so.1
$ ln -s libmath.so.1.0.0 libmath.so

# 编译期链接
$ gcc main.c -L. -lmath -o app
# 链接器找 libmath.so → libmath.so.1 → libmath.so.1.0.0
```

修真界里 soname 的版本号设计有讲究。约定俗成：主版本号（major）变了表示 ABI 不兼容，所有依赖这个库的可执行文件都得重编译；从版本号（minor）变了表示加了新功能但 ABI 兼容；修订号（patch）变了只是 bug fix。这条规矩让发行版（比如 Debian）的「依赖管理」成为可能。库装到 `/usr/lib` 后，`ldconfig` 会扫一遍所有 `.so`，把每个 soname 对应的文件登记到 `/etc/ld.so.cache`，动态链接器加载时直接查缓存不扫目录。

```ld
/* libmath.version */
LIBABC_1.0 {
    global:
        add;
        sub;
    local:
        *;  /* 其他所有符号都隐藏 */
};
```

```bash
$ gcc -fPIC -shared -Wl,--version-script,libmath.version \
    add.c sub.c -o libmath.so.1.0.0
```

修真界里这个 map 文件格式是 ld 脚本的子集，叫「linker version script」。它不仅管「暴露不暴露」，还管「这个符号属于哪个版本」，动态链接器加载时能精准挑出版本对应的符号。大库里 glibc、libstdc++ 都用这个机制保证 ABI 兼容性。

修真比喻：soname 是修真界的「灵器身份证号」。一把剑（real name `libfoo.so.1.0.0`）有多个名字：弟子入门时喊的剑号（linker name `libfoo.so`）、江湖登记的门派代号（soname `libfoo.so.1`）、以及物理上这把剑的真身。只要门派代号不变，剑怎么磨都还是这把剑；门派代号一变（比如 `libfoo.so.2`），就说明这把剑被宗门重新铸造过了，所有用旧剑的功法（可执行文件）都得回炉重修。

### 静态库 vs 动态库：修真界的决策树

修真界里实战项目总要在两种库之间选。把这一节做成决策树，方便弟子按症状开药。

修真界里先看四个主要差异：

| 对比项 | 静态库 `.a` | 动态库 `.so` |
|------|------------|-------------|
| 链接时机 | 链接时整段复制进可执行 | 链接时只留 DT_NEEDED 清单，运行时加载 |
| 可执行文件大小 | 大（含库代码） | 小（只含 GOT/PLT 引用） |
| 启动速度 | 快（不需要加载外部 `.so`） | 慢（要扫 DT_NEEDED、解析符号） |
| 升级库 | 必须重链接可执行文件 | 直接替换 `.so`，可执行不用动 |
| 部署复杂度 | 简单，单文件 | 复杂，要保证目标机器有对版本的 `.so` |
| `-fPIC` 必需 | 否 | 是 |

修真界里按四种情况做选择：

第一种情况，库要被多个进程用，且进程之间需要共享物理内存。Linux 系统库走这条路，比如 glibc 和 libpthread 都是 `.so`，`bash`、`ssh`、`vim` 几十个进程同时在跑，全都链 `libc.so.6`，物理内存里实际只占一份。如果每个进程都把 libc 静态链进去，几百兆物理内存就没了。

第二种情况，库很少更新，且对启动速度敏感。嵌入式 Linux 设备经常这么干：所有依赖打包成一个静态二进制，部署到设备上，不依赖 `/usr/lib` 里有什么。这种「单文件可执行」部署起来最省心，不用考虑目标机的库版本。Docker 容器里的 Go 程序也走这条路线。

第三种情况，库要作为插件机制的一部分。这一条就是上一节 `dlopen` 的领域，必须是 `.so`，不能用 `.a`。因为 `.a` 在编译期就被复制进可执行了，没法「运行时临时加载」。

第四种情况，库的 ABI 不稳定，还在快速迭代。这种情况下用 `.a` 更安全：`.a` 把代码复制进可执行，避免了升级 `.so` 时不同进程之间互相干扰。代价是每次库更新都要重链整个项目。

修真比喻：修真界里选静态库还是动态库，跟选「自带干粮」还是「到分舵吃饭」一个道理。自带干粮（静态）省心但累赘，路上补给要够。到分舵吃饭（动态）轻装上阵，但分舵关门（`.so` 找不到）就饿肚子。长途任务（嵌入式部署）自带干粮，开在固定山门的服务（服务器进程）到分舵吃就行。

### 几个修真界里常见的踩坑

修真界里库这条路上有几颗常踩的雷。

第一颗雷，`.so` 没加 `-fPIC`。x86_64 上编译能过，运行时跳转到库代码时崩在 GOT 重定位上，报错是 `recompile with -fPIC`。

第二颗雷，soname 设了但磁盘上的符号链接没建对。编译时 `-lfoo` 找不到 `libfoo.so`，运行时 `DT_NEEDED=libfoo.so.1` 找不到 `libfoo.so.1`。这种雷在跨机器部署（dev 编出来扔到 prod 跑）时高发。

第三颗雷，`dlopen` 后没 `dlclose`，长跑进程里 `.so` 累积在内存里导致 OOM。更隐蔽的情况是 `dlsym` 返回的函数指针被静态缓存，`dlclose` 后函数指针变成野指针，下次调用崩。

第四颗雷，C++ 库没加 `extern "C"` 就被 `dlopen` 加载。C++ 函数有名字修饰（name mangling），`dlsym(handle, "MyFunc")` 找不到符号。要么给库函数加 `extern "C"`，要么用 `c++filt` 反推。

第五颗雷，符号可见性没管，`static` 函数漏到动态符号表。在 C 里 `static` 函数本来就是「本翻译单元内可见」，但全局变量没说 `static` 就默认 external linkage，进 `.so` 时就成了默认可见。教训：所有不想暴露的函数和全局变量，要么加 `static`，要么靠 `-fvisibility=hidden` 兜底。

修真比喻：修真界这几颗雷，每一颗都让弟子写过不少 bug。`-fPIC` 缺了是「铸剑没用好钢」，soname 漏了是「灵器没上户口」，句柄泄漏是「百宝囊不收口」，`extern "C"` 漏了是「暗号没对上」，符号可见性漏了是「宗门密法泄到了江湖」。

修真界里这五颗雷踩中一颗，调试起来都痛苦。建议弟子每写一个库就拿 `nm -D`、`readelf -d`、`file` 这三个工具查一遍，三分钟的事能省后面三天。

---

## 修仙术语对照表

| 修仙术语 | 技术现实 | 本篇位置 |
|----------|----------|----------|
| 装订器 | `ar` 静态库归档工具 | 静态库制作 |
| 印本典籍 | 静态库 `.a`，整段复制进可执行 | 静态库制作 |
| 玉简传功 | 动态库 `.so`，运行时加载 | 动态库制作 |
| 坐标重写 | `-fPIC` 位置无关代码 | 为什么需要 -fPIC |
| 中转书页 | GOT（Global Offset Table） | 为什么需要 -fPIC |
| 临阵拔刀 | `dlopen` 运行时加载库 | dlopen / dlsym |
| 暗号簿 | `dlsym` 按名字查符号 | dlopen / dlsym |
| 错误小纸条 | `dlerror` 取错误信息 | dlopen / dlsym |
| 临场收刀 | `dlclose` 关闭库句柄 | dlopen / dlsym |
| 传功规矩 | 符号可见性 visibility | 符号可见性 |
| 外传功法目录 | `__attribute__((visibility("default")))` | 符号可见性 |
| 宗门密法不出声 | `-fvisibility=hidden` | 符号可见性 |
| 灵器身份证号 | soname（DT_SONAME） | soname |
| 门派代号 | soname 里的主版本号 | soname |
| 真身 | real name 如 `libfoo.so.1.0.0` | soname |
| 暗号 | linker name 如 `libfoo.so` | soname |
| 自带干粮 | 静态部署，独立可执行 | 静态 vs 动态 |
| 到分舵吃饭 | 动态部署，运行时加载 `.so` | 静态 vs 动态 |
| 铸剑缺钢 | `.so` 没加 `-fPIC` | 常见坑 |
| 灵器无户口 | soname 没建符号链接 | 常见坑 |
| 百宝囊不收口 | `dlopen` 后没 `dlclose` | 常见坑 |
| 暗号没对上 | C++ 名字修饰与 `dlsym` 不匹配 | 常见坑 |

---

## 进阶条件

- [ ] 能用 `ar rcs` 打出一个静态库，并用 `ar t` 查看成员列表
- [ ] 能用 `gcc -fPIC -shared` 打出一个动态库，并用 `file` 确认产物是 ELF shared object
- [ ] 能解释为什么动态库必须加 `-fPIC`，以及 GOT 在 PIC 里扮演什么角色
- [ ] 能用 `dlopen` + `dlsym` + `dlclose` + `dlerror` 写一个简单的插件加载器
- [ ] 能区分 `RTLD_LAZY` 和 `RTLD_NOW` 的差异，并说出一个推荐用 `RTLD_NOW` 的真实案例
- [ ] 能用 `-fvisibility=hidden` 加白名单宏把一个库的导出符号收到只剩几个公开 API
- [ ] 能解释 soname 与 real name、linker name 三者的关系，并画出从编译期到运行期的查找路径
- [ ] 能用 `-Wl,-soname` 给 `.so` 设 soname，并正确建好符号链接让 `-lfoo` 编译能过、运行时 `ldd` 也能找到

修真界里这些条件全通过，库的制作和加载这一关就算破了。修真路不止，下一篇是 088 Makefile，看看弟子怎么把 `gcc -fPIC -shared -Wl,-soname,libmath.so.1 ...` 这一长串命令写成一个能自动跑的脚本。

---

## 下期预告 + 互动

下一篇：088 Makefile——把手动编译改成自动化脚本。弟子总不能每次都手敲一长串 `gcc -fPIC -shared -Wl,-soname,libmath.so.1 ...` 命令。Makefile 怎么写？变量怎么用？自动推导怎么省事？`.PHONY` 是干啥的？GNU Make 的模式规则怎么配 CMake？下一篇把这些拆开看。

互动话题：

1. 你修真路上踩过 `.so` 没加 `-fPIC` 的坑吗？报错信息是 `recompile with -fPIC` 还是别的？
2. 你的项目里是用静态库多还是动态库多？选型的理由是什么？评论区等你。

---

## 落款

*本文是「码农修仙传」系列第87篇。系列导航见 [xren.ren](https://xren.ren)*