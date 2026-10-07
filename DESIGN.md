# Design System — Signal Architecture

## Direction

Um ambiente editorial-tecnológico em que sinais dourados atravessam a interface e mudam de função: assinatura no hero, trilha de aquisição, régua de processo e retorno no encerramento. O sistema deve parecer uma instrumentação de trabalho real, não um dashboard decorativo.

## Color

- Obsidian: `#070708` — superfície dominante.
- Dark Surface: `#141414` — planos técnicos e estados elevados.
- Off White: `#F4EFE8` — texto e contraste editorial.
- Signal Gold: `#D3A96B` — energia, conexão, progresso e estados ativos.
- Light Gold: `#E6C487` — ênfase secundária.
- Secondary Gray: `#9B9894` — metadados e informação de apoio.

O dourado representa sinal e fluxo. Nunca funciona como ornamento de luxo, halo constante ou preenchimento dominante.

## Typography

- Instrument Serif: mensagens conceituais, manifesto e grandes chamadas.
- Manrope: navegação, corpo, projetos, métricas e controles.
- JetBrains Mono: somente dados, telemetria, IDs e medição.

Títulos usam escala fluida com `clamp()`. Texto corrido mantém medida legível e contraste mínimo AA.

## Layout

- Grid máximo de 1440 px, com guias verticais discretas.
- Composição assimétrica e alternância editorial nos cases.
- Screenshots ocupam grande parte da viewport; informações técnicas orbitam a peça principal.
- Mobile recompõe relações em sequência, sem apenas reduzir o desktop.
- Bordas finas codificam estrutura; cards repetitivos não definem a página.

## Signature Element

O `ProprietaryCore` materializa BUILD → ACQUIRE → MEASURE → OPTIMIZE. Ele reaparece com variações funcionais, mantendo continuidade entre seções.

## Motion

- Entrada e revelação: `expo.out`/`power4.out`, 500–900 ms.
- Reposicionamento e scroll: progressão controlada, sem bounce.
- Hover e foco: 120–180 ms para feedback; não mover o próprio alvo de hit.
- Animações contínuas só permanecem ativas quando visíveis.
- `prefers-reduced-motion` remove parallax, sequências e movimento não essencial.

## Interaction

- Cursor contextual é uma camada complementar somente em dispositivos com ponteiro preciso.
- Projetos abrem dossiês acessíveis por teclado.
- Tecnologias revelam identidade por hover e toque, mantendo nome e função disponíveis para leitores de tela.
- Todo controle possui foco visível e rótulo compreensível.

## Avoid

Gradientes decorativos, glassmorphism, bento grid gratuito, pills em excesso, métricas fictícias, prova social inventada, partículas aleatórias e motion sem função narrativa.
