const fs=require('fs');
let p='docs/index.md',t=fs.readFileSync(p,'utf8');
for(const d of ['lianqi','zhuji','jindan','yuanying','huashen','dujie']){
t=t.replace("<a class='realm-card' href='/"+d+"/'>","<a class='realm-card realm-character-card' href='/"+d+"/'><img class='realm-character' src='/characters/"+d+".webp' alt='"+d+" 境界修士' loading='lazy'/>");
}
fs.writeFileSync(p,t);
p='docs/.vitepress/theme/Layout.vue';t=fs.readFileSync(p,'utf8');
t=t.replace('<template #doc-before>','<template #sidebar-nav-before>\n<div v-if="current" class="sidebar-character"><img :src="\'/characters/\'+section+\'.webp\'" :alt="current[0]+\'修士\'"/><span>{{ current[0] }} · 引路人</span></div>\n</template>\n<template #doc-before>');
t=t.replace('<div class="gateway-mark" aria-hidden="true">','<img v-if="current" class="gateway-character" :src="\'/characters/\'+section+\'.webp\'" :alt="current[0]+\'修士\'"/><div v-else class="gateway-mark" aria-hidden="true">');
fs.writeFileSync(p,t);
