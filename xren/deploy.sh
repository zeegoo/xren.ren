#!/bin/bash
# 码农修仙传 · 一键部署脚本
# 用法：bash deploy.sh

SERVER="ubuntu@43.135.53.100"
SERVER_PATH="/var/www/xren"

set -e

cd "$(dirname "$0")"

echo "📝 Build 站点..."
npx vitepress build docs

echo "📤 上传到服务器..."
ssh $SERVER "sudo mkdir -p $SERVER_PATH && sudo chown ubuntu:ubuntu $SERVER_PATH"
rsync -avz --delete docs/.vitepress/dist/ $SERVER:$SERVER_PATH/

# 重新生成 stats.json（rsync --delete 会删掉它）
echo "📊 重新生成统计..."
ssh $SERVER "bash ~/umami/export-stats.sh && chmod a+r $SERVER_PATH/stats.json" 2>/dev/null || true

echo "🔧 修复Nginx权限..."
ssh $SERVER "sudo chown -R www-data:www-data $SERVER_PATH && sudo find $SERVER_PATH -type d -exec chmod 755 {} \; && sudo find $SERVER_PATH -type f -exec chmod 644 {} \;"

echo "✅ 部署完成！"
echo "🌐 HTTP:  http://43.135.53.100"
echo "🌐 域名:  http://xren.ren (需 DNS 解析到此服务器)"
echo ""
echo "🔑 配置 HTTPS (首次执行):"
echo "   ssh $SERVER sudo certbot --nginx -d xren.ren -d www.xren.ren"
