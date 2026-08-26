# Textos de lançamento

Rascunhos. **Nenhum foi publicado.** Cada um passou pela
[tabela de alegações](README.md#tabela-de-alegações--evidência).

O tom é o mesmo do README, de propósito: uma alegação, um comando, uma demo
honesta, zero ponto de exclamação. Num projeto cuja credibilidade inteira é não
exagerar, o texto de lançamento é onde isso costuma vazar.

---

## 1. Post em português — público geral

> Todo mercado no Brasil emite nota fiscal eletrônica da sua compra. Quase
> ninguém olha a própria.
>
> Ela tem o preço que você **pagou de verdade** — depois da promoção, depois do
> desconto do clube, depois de o produto ter vindo num tamanho diferente do que
> estava na gôndola. Comparador de preços não tem isso. Ele tem o preço
> anunciado, na loja que paga o anúncio.
>
> Passei três meses juntando as minhas e transformando num método. Duas
> descobertas chatas e lucrativas:
>
> **1. Comparar etiqueta com etiqueta escolhe errado.** Óleo de 900 ml a
> R$ 7,49 parece mais barato que o de 1 litro a R$ 7,90. Por litro, é 5% mais
> caro. A embalagem de 900 ml existe porque quase todo mundo compara etiquetas.
>
> **2. Trocar de mercado quase nunca compensa.** Frete, pedido mínimo e a sua
> tarde custam mais que 5% de diferença. A regra que uso: só mudar acima de 8%,
> e com pelo menos 3 observações, senão você está reagindo a uma promoção de um
> dia.
>
> Publiquei o método e a ferramenta. **O método funciona numa planilha, sem
> instalar nada** — é a parte que economiza dinheiro. O programa só automatiza a
> conta.
>
> Não prometo porcentagem de economia: não medi contra uma linha de base
> controlada, e quem promete número sem isso está chutando.
>
> github.com/yolo-labz/feira

**Peça:** `social-preview.png`. **Canal:** LinkedIn, Instagram, grupo de família.

---

## 2. Post técnico — OSS

> **feira** — comparador de preço de mercado que parte da nota fiscal
> eletrônica brasileira (NFC-e), não do preço anunciado.
>
> - Python de biblioteca padrão. Zero dependência de runtime, zero chamada de
>   rede. Os dados são CSV e Markdown que abrem em qualquer editor.
> - Normaliza tudo para R$/kg, R$/L ou R$/un antes de comparar — a garrafa de
>   900 ml não ganha da de 1 litro por ter etiqueta menor.
> - Regra de migração explícita: só troca de mercado com ≥8% de diferença e ≥3
>   observações. O veredito mais comum é `MANTER`, e quando faltam dados ele
>   responde `COLETAR` em vez de chutar.
> - Servidor **MCP** incluso, para perguntar em português pelo cliente de IA que
>   você já usa — sem chave de API do lado do `feira`.
>
> A parte que talvez interesse a quem trabalha com agentes: **o servidor MCP não
> tem nenhuma ferramenta de pedido ou pagamento.** Não é um portão de
> confirmação que dá pra convencer o modelo a pular — a capacidade não existe. O
> teste verifica a ausência, inclusive se o código do servidor apenas mencionar
> o driver do celular, e foi validado ao contrário: plantando uma ferramenta
> `pagar_pedido`, ele quebra.
>
> Segurança por ausência de capacidade é mais forte que segurança por
> confirmação, porque não depende de a confirmação estar certa.
>
> 0.1.0, sem release publicada, sem instalação externa conhecida. Se você for a
> primeira pessoa a instalar, o relato do que quebrou vale mais que um PR.
>
> github.com/yolo-labz/feira

**Peça:** `demo.gif`. **Canal:** Hacker News (Show HN), Lobsters, Mastodon.

> **Nota para Show HN:** o título deve ser factual — *"Show HN: feira – grocery
> price tool that starts from your own receipts, not advertised prices"*. Sem
> "revolutionary", sem "AI-powered". A primeira resposta honesta a "does it save
> money?" é: *não medido contra linha de base controlada.*

---

## 3. Enquadramento acadêmico — professora, pesquisa, extensão

> O material tem três documentos, em ordem de leitura:
>
> 1. **O caso** — o que é, com os números de uma compra real e o que ainda não
>    está provado.
> 2. **O método** — o procedimento em si. Roda numa planilha, sem software
>    nenhum: linha de base, normalização por unidade, regra de decisão, ponto de
>    recompra, e a nota fiscal como fonte de verdade.
> 3. **Apêndice técnico** — para quem for instalar.
>
> O segundo é o que interessa fora da computação. Ele descreve um problema de
> operações doméstico — decisão sob incerteza com custo de troca, informação
> assimétrica na embalagem, e coordenação entre duas pessoas — que dá para
> ensinar e para testar sem nenhuma tecnologia.
>
> O que o material **não** tem: economia medida contra linha de base
> controlada. Um piloto de quatro semanas com quatro casas resolveria isso, e o
> desenho está no repositório.
>
> Possíveis encaixes: caso de ensino, módulo de disciplina em operações ou
> sistemas de informação, projeto de extensão sobre orçamento doméstico e
> desperdício, ou base pública de preços a partir de NFC-e — esta última com a
> ressalva de que uma casa não é amostra.

**Peça:** nenhuma, ou `demo.png` estático. **Canal:** e-mail (o rascunho vive
fora deste repositório, no vault pessoal).

---

## Roteiro do trailer — ~20 s

**Não gravado.** Só produzir depois que as peças do README estiverem estáveis, e
só se o resultado couber no orçamento de peso sem virar binário gigante no git.

| t | Tela | Legenda (queimada, sem áudio) |
|---|---|---|
| 0–3 s | `social-preview.png` estático | *O preço que você pagou, por quilo.* |
| 3–8 s | terminal: `feira compare oleo-de-soja` digitando | *900 ml parece mais barato.* |
| 8–12 s | a tabela aparece, R$ 8,32/L vs R$ 7,90/L | *Não é.* |
| 12–16 s | o veredito `MANTER` em destaque | *E mesmo assim: não troque por 5%.* |
| 16–20 s | `github.com/yolo-labz/feira` | *O método funciona numa planilha.* |

Regras: sem música com pancada, sem corte rápido, sem contador de estrelas. A
fonte do vídeo tem que ser regenerável — se virar um MP4 que ninguém sabe
refazer, não entra no repositório; vai como anexo de release ou link.

### Checklist de gravação (Cap ou equivalente)

- [ ] Terminal limpo: sem hostname, sem usuário, sem caminho da máquina
- [ ] Só dados de fixture — nunca uma casa real
- [ ] 100 colunas (abaixo disso a tabela do `feira` quebra a linha)
- [ ] Tema claro; conferir também no modo escuro do GitHub
- [ ] Sem notificação na tela, sem aba de navegador com dado pessoal
- [ ] Legenda queimada, porque a maioria assiste sem som
- [ ] Exportar equivalente estático + transcrição em texto
