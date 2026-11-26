// Ícones da família PICXEL Studio (identidade aprovada pelo Antonio em 26/11/2026, prévia em
// AgenteMN/ideias/suite/previa.html): quadrado preto arredondado, borda fina e o monograma brilhando no gradiente
// da cor do app. Fonte única: usado pela página (navegador) e por scripts/icones.mjs (gera os .svg em identidade/).
;(function () {
const APPS = {
  hubcx:   { nome: 'HUBCX',   g: ['#5ce6ff', '#00b4ec', '#3d6bff'] },
  aefx:    { nome: 'AEFX',    g: ['#6fb800', '#a6f000', '#d4ff5a'], txt: 'FX' },
  photocx: { nome: 'PHOTOCX', g: ['#b5001f', '#e8193c', '#ff5a76'], txt: 'PX' },
  kprox:   { nome: 'KPROX',   g: ['#d95926', '#f3853f', '#ffa45c'], txt: 'KX' }
}

let seq = 0
function icone(id, { unico = '' } = {}) {
  const a = APPS[id], k = 'g' + id + (unico || seq++)
  const miolo = a.txt
    ? `<text x="256" y="262" text-anchor="middle" dominant-baseline="middle" font-family="Segoe UI Variable Display, Segoe UI, Arial, sans-serif" font-weight="900" font-size="210" letter-spacing="-6" fill="url(#${k})" filter="url(#b${k})">${a.txt}</text>`
    : `<g fill="url(#${k})" stroke="url(#${k})" filter="url(#b${k})"><line x1="256" y1="160" x2="256" y2="230" stroke-width="22"/><line x1="160" y1="320" x2="225" y2="285" stroke-width="22"/><line x1="352" y1="320" x2="287" y2="285" stroke-width="22"/><circle cx="256" cy="136" r="38" stroke="none"/><circle cx="146" cy="328" r="38" stroke="none"/><circle cx="366" cy="328" r="38" stroke="none"/><circle cx="256" cy="268" r="50" fill="none" stroke-width="34"/></g>`
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="${a.nome}"><defs>` +
    `<linearGradient id="${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a.g[0]}"/><stop offset=".5" stop-color="${a.g[1]}"/><stop offset="1" stop-color="${a.g[2]}"/></linearGradient>` +
    `<filter id="b${k}" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9" result="s"/><feMerge><feMergeNode in="s"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>` +
    `<rect x="20" y="20" width="472" height="472" rx="110" fill="#050506" stroke="${a.g[1]}" stroke-opacity=".35" stroke-width="5"/>${miolo}</svg>`
}

if (typeof module !== 'undefined') module.exports = { APPS, icone }
else window.PX_ICONES = { APPS, icone }
})()
