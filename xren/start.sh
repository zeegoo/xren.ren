#!/bin/bash
# 码农修仙传 - VitePress 一键启动脚本
# 用法：双击运行 或 终端执行 bash start.sh

cd "$(dirname "$0")"

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📋 首次运行，正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 依赖安装失败，请检查 Node.js 环境"
        read -p "按回车退出..."
        exit 1
    fi
    echo "✅ 依赖安装完成"
fi

echo ""
echo "========================================"
echo "  码农修仙传 · VitePress 站点"
echo "  玄芯散人 · xren.ren"
echo "========================================"
echo ""
echo "🌐 启动中..."
echo "   本地访问: http://localhost:5173"
echo ""
echo "   按 Ctrl+C 停止服务"
echo ""

npx vitepress dev docs --host 0.0.0.0 --port 5173
