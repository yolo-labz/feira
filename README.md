# feira

**Comprar mercado abaixo do preço que você pagaria sozinho — usando os seus
próprios dados, num punhado de arquivos de texto.**

*Buying groceries below what you'd otherwise pay, from your own data, in a
handful of plain text files. Portuguese docs, English code.*

---

## O problema

Você não sabe se pagou caro. Ninguém sabe.

O preço do arroz na sua casa varia 40% entre mercados, entre semanas e entre
embalagens, e a única forma de perceber é comparar preço por quilo — coisa que
nenhum ser humano faz de cabeça no corredor do supermercado, e que os mercados
sabem disso. A garrafa de óleo de 900 ml existe porque a de 1 litro existia
antes.

A resposta usual é um app de comparação. Mas app de comparação compara o preço
*anunciado*, na loja onde ele quer que você compre, e não sabe nada sobre o que
você de fato consome, nem quanto você pagou de verdade depois do desconto.

O `feira` faz o contrário: parte do que **a sua casa** comprou, pelo preço que
**você** pagou, e responde uma pergunta específica — *vale a pena mudar alguma
coisa?* Na maioria das semanas a resposta honesta é "não", e ele diz isso.

## Como funciona, em uma tela

```
$ feira compare oleo-de-soja

Óleo de soja   (oleo-de-soja)
preço por L, últimos 90 dias

  mercado                           mediana        mín        máx    n  última
  ---------------------------- ------------ ---------- ---------- ----  ----------
  atacarejo-online                  R$ 7,90    R$ 7,90    R$ 8,10    3  2026-08-18 *
  mercado-do-bairro                 R$ 8,32    R$ 8,10    R$ 8,32    3  2026-08-11  <- atual

  MANTER: atacarejo-online está apenas 5.1% abaixo (limite 8%) — não paga a troca
```

Duas coisas acontecem aí, e as duas importam:

1. **A ordem inverteu.** Na etiqueta, o óleo do bairro custa R$ 7,49 e o do
   atacarejo custa R$ 7,90 — o do bairro parece mais barato. Por litro, é 5%
   mais caro. A embalagem de 900 ml escondia isso.
2. **Mesmo assim, ele diz para não mudar.** 5% não paga o frete, o pedido mínimo
   e a tarde que você gastaria. Uma ferramenta que recomenda trocar de mercado
   toda semana faz você gastar mais perseguindo promoções.

Essa segunda parte é o produto. A primeira é aritmética.

## Instalação

```sh
curl -fsSL https://raw.githubusercontent.com/phsb5321/feira/main/install.sh | sh
```

Instala no seu diretório pessoal, sem `sudo`, e roda um autoteste no fim. Só
precisa de Python 3.9+, que já vem em qualquer Linux e macOS.

Prefere ler antes de executar? É recomendado, e o script foi escrito para isso:

```sh
curl -fsSL https://raw.githubusercontent.com/phsb5321/feira/main/install.sh -o install.sh
less install.sh
sh install.sh --dry-run    # mostra tudo que faria, sem escrever nada
sh install.sh
```

Depois:

```sh
feira init ~/minha-feira
cd ~/minha-feira
feira advise
```

O repositório já vem com dados de exemplo, então `feira advise` responde alguma
coisa desde o primeiro minuto. Apague os exemplos quando tiver os seus.

## As quatro camadas — comece pela primeira

Este projeto é frequentemente confundido com "uma IA que faz sua compra". Não é,
e a distinção decide quanto trabalho você vai ter.

| Camada | O que é | Precisa de | Quem deve usar |
|---|---|---|---|
| **1. Método** | O jeito de decidir. Caderno e planilha bastam. | nada | **todo mundo, primeiro** |
| **2. Ferramenta** | O `feira`: histórico, normalização, regra de migração | um computador | quem já cansou da planilha |
| **3. Agente** | As *skills* — um assistente de IA que opera as camadas 1 e 2 | Claude Code ou similar | quem já usa um agente |
| **4a. Captura / web** | A [extensão](extensao/): lê os preços da página que você já está vendo | um navegador | quem cansou de digitar preço |
| **4b. Execução no app** | `feira-fone`: montar o pedido no aplicativo | **celular Android certificado, ligado à máquina** | quem tem um aparelho sobrando |

**A camada 4 é opcional e a maior parte do valor não está nela.** Toda a
economia vem de decidir certo — o que comprar, onde, e quando não mudar nada.

Sobre a 4b: **emulador não serve.** Os aplicativos de entrega verificam Play
Integrity, que é checagem do lado do servidor contra hardware certificado —
AVD, Waydroid, redroid e BlueStacks falham exatamente no passo do pagamento.
Celular físico ou nada; [o porquê, em detalhe](docs/pesquisa/harness-de-login.md).

Se você não tem um celular sobrando, **não está perdendo nada de importante.**
Comece pela camada 1, que funciona hoje, sem instalar coisa alguma. Detalhes em
[docs/explicacao/camadas.md](docs/explicacao/camadas.md).

## Documentação

Leia nesta ordem:

| # | Documento | Para quem |
|---|---|---|
| 1 | [O caso](docs/01-o-caso.md) | qualquer pessoa — o que é isto, com números reais |
| 2 | [**O método**](docs/02-o-metodo.md) | **quem quer fazer** — funciona sem software nenhum |
| 3 | [Apêndice técnico](docs/03-apendice-tecnico.md) | quem vai instalar e mexer |

Se você tem 20 minutos e nenhuma vontade de instalar nada, leia só o **método**.
Ele é a parte que não depende de tecnologia, e é a parte que economiza dinheiro.

Complementos:

- [As quatro camadas](docs/explicacao/camadas.md) — o que cada nível exige
- [Privacidade](docs/explicacao/privacidade.md) — o que nunca sai da sua máquina
- [A extensão](extensao/README.md) — capturar preço sem digitar
- [Camada 4b — o celular](skills/feira-pedido/referencia/tier-3-android.md) — setup e armadilhas
- [Pesquisa](docs/pesquisa/) — harness de login, mercado, produto e jurídico

## O que este projeto não faz

Dito na abertura para você não descobrir depois:

- **Não busca preço na internet.** Ele só sabe o que você registrou. Isso é uma
  limitação e é de propósito: preço anunciado não é preço pago.
- **Não paga nada sozinho.** Nunca, nem na camada 4b com o celular na mão. No
  `feira-fone` isso é **código**: tocar num botão com "pagar", "finalizar
  pedido" ou equivalente é recusado sem `--eu-confirmo` naquela invocação. Ver
  [o portão humano](docs/explicacao/camadas.md#o-portão-humano).
- **Não recomenda nas primeiras semanas.** Precisa de três observações por
  mercado antes de opinar, e vai dizer isso em vez de chutar.
- **Não promete uma porcentagem.** Qualquer número de economia depende do que
  você faria sem ele, e isso ninguém mede direito. Ver
  [a crítica honesta](docs/01-o-caso.md#o-que-ainda-nao-esta-provado).

## Verificar

```sh
sh tests/run.sh
```

Quatro suítes, sem rede, sem celular, sem navegador: aritmética de unidade e
regra de migração; portão de pagamento e resolução de elemento; parsing do
coletor da extensão; e um repositório recém-criado respondendo aos comandos.

## Estado

Versão 0.1.0. Roda diariamente numa casa em Recife desde maio de 2026; **nunca
foi instalado por outra pessoa**. Se você for a segunda, [abra uma
issue](https://github.com/phsb5321/feira/issues) contando o que quebrou — é a
contribuição mais útil possível agora.

## Licença

[Apache-2.0](LICENSE). Veja também o [aviso legal](DISCLAIMER.md), que é curto e
vale a leitura antes de automatizar qualquer coisa que gaste dinheiro.
