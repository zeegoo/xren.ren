const fs = require('fs')
const path = require('path')
const style = process.argv[2] || 'anime'
if (!['anime', 'anime-v1', 'anime-v2', 'realistic'].includes(style)) throw new Error('Use anime or realistic')
const root = path.resolve(__dirname, '../docs/public/characters')
const names = ['lianqi','zhuji','jindan','yuanying','huashen','dujie']
for (const name of names) if (!fs.existsSync(path.join(root, style, name + '.webp'))) throw new Error('Missing ' + style + '/' + name)
for (const name of names) fs.copyFileSync(path.join(root, style, name + '.webp'), path.join(root, name + '.webp'))
console.log('Character style: ' + style)
