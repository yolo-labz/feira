# Kit de lançamento

Textos e peças prontos para publicar. **Nada aqui foi publicado** — é material
preparado, aguardando decisão.

A regra que governa este diretório: **toda frase publicável tem que passar pela
[tabela de alegações](#tabela-de-alegações--evidência)**. Se uma afirmação não
tem linha lá, ela não sai. É assim que a cópia não vira propaganda sem ninguém
perceber.

| Arquivo | O que tem |
|---|---|
| `README.md` (aqui) | descrições, tabela de alegações, inventário de peças |
| [`posts.md`](posts.md) | os três textos de lançamento + roteiro de trailer |

## Descrições

### Uma linha (até 120 caracteres — descrição do repositório, bio)

> Compare o preço que sua casa realmente pagou, por quilo — e só troque de mercado quando compensa.

Variante em inglês para os tópicos e a busca do GitHub:

> Brazilian household grocery price tool — normalises what you actually paid to price per kg/L, local-first, no API key.

### Três frases (post curto, apresentação, README de diretório)

> O `feira` compara o preço que a sua casa **realmente pagou** por mercado —
> extraído da nota fiscal eletrônica — normalizado por quilo, litro ou unidade.
> Ele só recomenda trocar de mercado quando a diferença passa de 8% com pelo
> menos 3 observações; na maior parte das semanas a resposta é "não mude nada".
> Os dados ficam em arquivos de texto na sua máquina, e o software nunca compra
> nem paga: quem finaliza é você, à mão, no aplicativo do mercado.

### Longa (página de projeto, submissão, e-mail)

> Comparador de preços olha o preço **anunciado**, na loja que paga o anúncio. O
> `feira` faz o contrário: parte da nota fiscal eletrônica que o mercado já
> emitiu para a sua casa, normaliza cada preço por quilo, litro ou unidade, e
> responde uma pergunta só — *vale a pena mudar alguma coisa?*
>
> A normalização é a parte que devolve dinheiro sozinha: uma garrafa de 900 ml a
> R$ 7,49 tem etiqueta menor e sai mais cara por litro que uma de 1 litro a
> R$ 7,90. A regra de decisão é a parte que evita perder dinheiro: só migrar com
> 8% de diferença e 3 observações, porque trocar de mercado custa frete, pedido
> mínimo e tempo.
>
> O método funciona numa planilha, sem instalar nada — e essa é a camada que
> mais importa. O software é Python de biblioteca padrão, sem dependência de
> runtime, sem chamada de rede, com os dados em texto puro que abre em qualquer
> editor. Há um servidor MCP para perguntar em português usando o cliente de IA
> que você já tem, e ele **não possui nenhuma ferramenta de pedido ou pagamento**
> — um teste falha se alguém adicionar uma.
>
> Roda numa casa em Recife desde maio de 2026. Nenhuma economia foi medida
> contra linha de base controlada, e o projeto não promete porcentagem.

## Tabela de alegações ↔ evidência

Cada linha é uma coisa que a gente pode dizer em público, e onde alguém confere.

| Alegação | Status | Evidência |
|---|---|---|
| Normaliza preço por kg/L/unidade | ✅ verificável | `feira compare oleo-de-soja`; `parse_package()` + casos no `feira selftest` |
| 900 ml a R$ 7,49 sai mais caro por litro que 1 L a R$ 7,90 | ✅ verificável | fixture `template/dados/observacoes.csv`; aritmética no `selftest` |
| Só migra com ≥8% e ≥3 amostras | ✅ verificável | `verdict()` em `bin/feira`; casos no `feira selftest` |
| Diz "não mude" quando não compensa | ✅ verificável | veredito `MANTER` na demo e no `advise` |
| Recusa opinar sem dados suficientes | ✅ verificável | veredito `COLETAR`; item `papel-higienico-30m` |
| Lê nota fiscal eletrônica (NFC-e modelo 65) | ✅ verificável | `feira nfce`; `parse_nfce()` em `bin/feira` |
| Zero dependência de runtime | ✅ verificável | só stdlib; `import` no fonte; CI sem `pip install` |
| Nenhuma chamada de rede no CLI | ✅ verificável | ausência de `urllib`/`socket`/`http` em `bin/feira` |
| MCP não tem ferramenta de pedido nem pagamento | ✅ verificável | `tests/test_mcp.py`, incluindo teste negativo |
| `feira-fone` recusa botão de pagamento | ✅ verificável | lista `PERIGO` + `tests/test_fone.py` |
| Instalador não roda como root, instala só no `$HOME` | ✅ verificável | `install.sh`; teste ponta a ponta no CI |
| Emulador Android falha no pagamento (Play Integrity) | ⚠️ raciocinado, não testado por nós | `docs/pesquisa/harness-de-login.md`, aferido 25/08/2026 — **dizer sempre com a data** |
| Roda numa casa em Recife desde maio/2026 | ⚠️ relato do autor | `docs/01-o-caso.md` — não é prova pública |
| **Economia em reais ou %** | ❌ **NÃO AFIRMAR** | não há linha de base controlada; `docs/01-o-caso.md#o-que-ainda-não-está-provado` |
| **Quantas pessoas usam** | ❌ **NÃO AFIRMAR** | não há instalação externa conhecida |
| "Pronto para produção", "v1.0" | ❌ **NÃO AFIRMAR** | 0.1.0, sem release publicada |

### Frases proibidas

Estas já foram testadas e reprovadas numa revisão adversarial (25/08/2026):

- ❌ "Comprar mercado abaixo do preço que você pagaria sozinho" — promete
  resultado financeiro causal
- ❌ "Você não sabe se pagou caro. Ninguém sabe." — universal indefensável
- ❌ "O preço do arroz varia 40%" — número sem fonte apresentado como fato geral
- ❌ "A garrafa de 900 ml existe porque a de 1 litro existia antes" — conjectura
  histórica sem evidência
- ❌ "5% não paga o frete" — a regra de 8% é política configurada, não prova
  econômica. Diga: "a política padrão não recomenda trocar abaixo de 8%"
- ❌ "não exige chave de API de ninguém" — o `feira` não exige; o cliente de IA
  pode exigir
- ❌ "nunca foi instalado por outra pessoa" — indemonstrável. Diga: "não há
  instalação externa conhecida"

## Inventário de peças

| Peça | Arquivo | Onde usar | Corte |
|---|---|---|---|
| Preview social | `docs/assets/rendered/social-preview.png` | ajuste do repositório no GitHub; unfurl de link | 1280×640 (2:1); recorte central em X/Slack |
| Herói do README | mesma imagem, a 640 px | topo do README | — |
| Demo animada | `docs/assets/rendered/demo.gif` | README; post técnico | 921×628, ~78 KB |
| Demo estática | `docs/assets/rendered/demo.png` | onde GIF não roda; e-mail | 921×628 |
| Demo em texto | `docs/assets/source/demo.cast` | leitor de tela; quem prefere texto | — |
| Marca | `docs/assets/source/logo.svg` | avatar da organização, favicon | quadrado, legível a 16 px |
| Diagrama | bloco Mermaid no README | README; slide | renderizado pelo GitHub |

Texto alternativo de cada uma: em [`MANIFEST.md`](../assets/MANIFEST.md) e nas
tags `alt` do próprio README. Não republique uma peça sem o texto alternativo
junto.

## Antes de publicar qualquer coisa

- [ ] Toda afirmação tem linha na tabela acima
- [ ] Nenhuma frase da lista de proibidas
- [ ] Nenhum dado real de casa em imagem — só fixture
- [ ] Texto alternativo em toda imagem
- [ ] Links apontam para `yolo-labz/feira`
- [ ] A afirmação sobre emulador vem com a data da aferição
- [ ] Sem ponto de exclamação, sem emoji em título, sem "🚀"
