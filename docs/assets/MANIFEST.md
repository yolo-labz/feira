# Inventário de assets

Toda peça deste repositório é gerada a partir de fonte versionada. Nada aqui foi
desenhado à mão numa ferramenta e exportado sem origem — se você não consegue
refazer com um comando, não deveria estar aqui.

Regenerar tudo: `make assets`. Conferir: `make check-assets` (roda no CI).

## Fontes — `docs/assets/source/`

| Arquivo | O que é | Ferramenta | Licença |
|---|---|---|---|
| `logo.svg` | a marca: etiqueta de preço com a barra de fração vazada | escrito à mão | Apache-2.0 (deste repo) |
| `social-preview.svg` | cartão 1280×640 para o preview social do GitHub | escrito à mão | Apache-2.0 (deste repo) |
| `arquitetura.mmd` | diagrama das quatro camadas | Mermaid (o GitHub renderiza) | Apache-2.0 (deste repo) |
| `demo.sh` | roteiro da demo de terminal | escrito à mão | Apache-2.0 (deste repo) |
| `demo.cast` | gravação da demo, formato asciicast v3 | asciinema 3.2.1 | Apache-2.0 (deste repo) |

**Nenhuma fonte tipográfica está embutida.** Os SVGs declaram a pilha do sistema
(`DejaVu Sans, Inter, system-ui, sans-serif`) e o texto do preview social é
convertido em caminho vetorial na renderização (`inkscape -T`), então ele não
depende de nenhuma fonte instalada — e não há licença de fonte para auditar.

**Nada foi gerado por IA de imagem.** Todo desenho é geometria escrita à mão,
legível no `git diff`.

## Renderizados — `docs/assets/rendered/`

| Arquivo | Dimensões | Peso | Orçamento | Como refazer |
|---|---|---:|---:|---|
| `social-preview.png` | 1280×640 | ~68 KB | ≤ 1024 KB (teto do GitHub) | `make assets` |
| `demo.gif` | 921×628, 45 quadros | ~78 KB | ≤ 900 KB | `make demo` |
| `demo.png` | 921×628 | ~45 KB | ≤ 300 KB | `make assets` (último quadro do GIF) |

Os orçamentos são verificados por `scripts/check-assets.py`, que **quebra o CI**
se uma peça engordar. O do GIF é bem mais apertado que o formato permite porque
ele precisa carregar no celular, em dado móvel.

## Dados usados nas peças

O preview social e a demo mostram **os dados de exemplo que acompanham o
`template/`** — o óleo de 900 ml contra o de 1 litro, do
`template/dados/observacoes.csv`.

Isso é regra, não coincidência:

- **Nenhum dado real de casa nenhuma** aparece em imagem deste repositório.
  Nota fiscal tem CPF e a lista completa do que uma família consome.
- Como as peças usam a fixture, elas **não podem divergir** do que a ferramenta
  realmente imprime: `feira compare oleo-de-soja` produz exatamente os números
  do cartão.

A demo é gravada num diretório temporário que é apagado no fim, sem nome de
usuário, sem hostname e sem caminho da máquina que gravou.

## Acessibilidade

- Todo SVG tem `<title>`, verificado pelo `check-assets.py`.
- Toda imagem no README tem texto alternativo descritivo — também verificado.
- O GIF **não é legível por leitor de tela**. Por isso existem o `demo.png`
  estático e o `demo.cast`, que é texto e pode ser lido linha a linha.
- O diagrama Mermaid vem sempre acompanhado de um parágrafo em prosa dizendo a
  mesma coisa. Leitor de tela não lê caixa e seta.
- A paleta é calculada contra o branco e **falha o CI abaixo de WCAG AA**. Verde
  e vermelho nunca carregam significado sozinhos — sempre há rótulo em texto.
- O GitHub não respeita `prefers-reduced-motion` em imagem de README. O cuidado
  ficou no conteúdo: a demo é lenta, sem piscar, e tem equivalente estático.
