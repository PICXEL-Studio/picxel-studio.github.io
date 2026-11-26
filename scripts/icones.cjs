// Gera identidade/<app>.svg a partir de identidade/icones.js (rodar: node scripts/icones.cjs)
const fs = require('fs'), path = require('path')
const { APPS, icone } = require('../identidade/icones.js')
const pasta = path.join(__dirname, '..', 'identidade')
for (const id of Object.keys(APPS)) {
  fs.writeFileSync(path.join(pasta, id + '.svg'), icone(id, { unico: 'x' }) + '\n')
  console.log('ok', id + '.svg')
}
