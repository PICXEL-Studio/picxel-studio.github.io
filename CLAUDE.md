# PICXEL Studio (site de download e identidade da suíte)

Empresa fictícia do Antonio (nome escolhido em 26/11/2026) que distribui os apps criativos dele para qualquer pessoa:
**HUBCX, AEFX, PHOTOCX e KPROX**. Plano completo no cérebro do MN: `AgenteMN/cerebro/padroes/suite-distribuivel.md`.
Sempre em português do Brasil. Na conversa ele é "meu nobre".

## O que tem aqui
- `index.html` + `estilo.css` + `site.js`: a **página de download**, publicada pelo GitHub Pages deste repositório
  público (`PICXEL-Studio/picxel-studio.github.io` → https://picxel-studio.github.io). Sem build, sem dependências.
- `site.js` lê a última release **pública** de cada app em `PICXEL-Studio/<app>` (hubcx, aefx, photocx, kprox): esses
  repositórios só têm os instaladores; o código continua privado em `cxildiner`. Sem release = "Em breve".
- `identidade/`: fonte da identidade única (aprovada em 26/11/2026, prévia em `AgenteMN/ideias/suite/previa.html`).
  `icones.js` desenha os ícones (quadrado preto arredondado, monograma brilhando no gradiente do app: HUBCX símbolo do
  hub ciano/azul, AEFX "FX" verde-limão, PHOTOCX "PX" vermelho, KPROX "KX" laranja); `node scripts/icones.cjs` gera
  os `.svg`.

## Regras
- **Claude**: os apps funcionam com o Claude Code ou o app Claude **da própria pessoa, por MCP** (regra da Anthropic:
  nada de Agent SDK com o login do plano em app distribuído). "Claude" só em texto, nunca no nome ou logo; o rodapé diz
  que a PICXEL Studio não tem ligação com a Anthropic.
- Texto sem travessão "—"; nada de caixa alta espaçada; a página funciona no celular (testar com print 390 px).
- **O `git push` é sempre do Antonio.** Commit local pode.
- Testar: abrir `index.html` no navegador (lê o GitHub de verdade) ou `mcp__mn__print` com 1280 e 390 de largura.
