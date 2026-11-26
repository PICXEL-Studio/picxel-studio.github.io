// Página de download: lê a última release pública de cada app (repositórios PICXEL-Studio/<app>, só com os
// instaladores; o código continua privado em cxildiner). Sem release ainda = "Em breve".
// A API do GitHub sem login aceita 60 pedidos por hora por IP: guarda a resposta por 10 min no navegador.
const ORG = 'PICXEL-Studio'
const { APPS, icone } = window.PX_ICONES
const INFO = {
  hubcx:   { desc: 'A casa dos apps: instala e atualiza os outros. Cronograma, mídias, marcas e copy.', asset: /^HUBCX-Instalador-[\d.]+\.exe$/i },
  aefx:    { desc: 'Editor de vídeo: cortes, legendas, motions, rastreio de rosto e efeitos.', asset: /^AEFX-Setup-[\d.]+\.exe$/i },
  photocx: { desc: 'Posts, carrosséis, thumbnails e apresentações em camadas editáveis.', asset: /^PHOTOCX-Setup-[\d.]+\.exe$/i },
  kprox:   { desc: 'Painel das redes: números, comparativos e apresentações prontas.', asset: /^KPROX-Instalador-[\d.]+\.exe$/i }
}
const $ = s => document.querySelector(s)
const mb = b => Math.round(b / 1048576) + ' MB'
const data = s => new Date(s).toLocaleDateString('pt-BR')

async function ultima(id) {
  const chave = 'px-rel-' + id
  try {
    const c = JSON.parse(sessionStorage.getItem(chave) || 'null')
    if (c && Date.now() - c.t < 600e3) return c.r
  } catch {}
  let r = null
  try {
    const resp = await fetch(`https://api.github.com/repos/${ORG}/${id}/releases/latest`, { headers: { Accept: 'application/vnd.github+json' } })
    if (resp.ok) {
      const j = await resp.json()
      const a = (j.assets || []).find(x => INFO[id].asset.test(x.name))
      if (a) r = { versao: j.tag_name.replace(/^v/, ''), url: a.browser_download_url, tamanho: a.size, data: j.published_at, notas: (j.body || '').trim() }
    }
  } catch {}
  try { sessionStorage.setItem(chave, JSON.stringify({ t: Date.now(), r })) } catch {}
  return r
}

document.querySelectorAll('[data-ic]').forEach(s => s.innerHTML = icone(s.dataset.ic))
$('#cartoes').innerHTML = Object.keys(APPS).map(id => `
  <div class="ct" id="ct-${id}" style="--cor:${APPS[id].g[1]}">
    ${icone(id)}<b>${APPS[id].nome}</b><p>${INFO[id].desc}</p>
    <small>Windows 10 e 11 · <span class="v">procurando a versão…</span></small>
    <a class="botao off" href="#">Baixar</a>
  </div>`).join('')

Promise.all(Object.keys(APPS).map(async id => [id, await ultima(id)])).then(lista => {
  const novidades = []
  for (const [id, r] of lista) {
    const ct = $('#ct-' + id), bt = ct.querySelector('.botao')
    if (!r) { ct.querySelector('.v').textContent = 'em breve'; bt.textContent = 'Em breve'; continue }
    ct.querySelector('.v').textContent = `versão ${r.versao} · ${mb(r.tamanho)}`
    bt.href = r.url; bt.textContent = 'Baixar'; bt.classList.remove('off')
    if (id === 'hubcx') { $('#baixar-hub').href = r.url; $('#hub-info').textContent = `Versão ${r.versao} · ${mb(r.tamanho)} · instala e atualiza os outros apps para você.` }
    novidades.push({ id, ...r })
  }
  if (!lista.find(([id, r]) => id === 'hubcx' && r)) { $('#baixar-hub').textContent = 'Em breve'; $('#baixar-hub').classList.add('off') }
  novidades.sort((a, b) => b.data.localeCompare(a.data))
  $('#lista-novidades').innerHTML = novidades.length
    ? novidades.map(n => `<div class="nv">${icone(n.id)}<div><b>${APPS[n.id].nome} ${n.versao}<small>${data(n.data)}</small></b><div></div></div></div>`).join('')
    : '<p class="fraco">As primeiras versões saem em breve.</p>'
  // notas como texto (nunca HTML vindo de fora)
  document.querySelectorAll('.nv div div').forEach((el, i) => { el.textContent = novidades[i].notas.split('\n').slice(0, 4).join('\n') || 'Melhorias e correções.' })
})
