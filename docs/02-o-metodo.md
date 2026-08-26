# O método

**Este é o documento principal.** Ele não menciona nenhum programa, porque o
método não depende de nenhum. Uma planilha e um caderno bastam para executá-lo
inteiro, e é assim que se deve começar — o software das camadas 2 a 4 só
automatiza o que estiver descrito aqui.

Tempo de leitura: 20 minutos. Tempo para rodar a primeira volta completa: três
semanas, e não tem como encurtar.

---

## 1. O que o método resolve

Uma casa não sabe se paga caro. Não é falta de atenção — é que a informação
necessária não existe em lugar nenhum:

- O preço do mesmo produto varia entre mercados, entre semanas e entre
  embalagens, e as três variações se sobrepõem.
- A comparação honesta é por quilo ou por litro, e a etiqueta mostra preço por
  embalagem. As embalagens mudam de tamanho justamente por isso.
- O preço que você lembra é o da última vez, e a memória guarda o preço que
  chamou atenção, não o preço normal.
- A promoção de um item some no total do carrinho, então ninguém percebe se
  ganhou ou perdeu.

O método produz três coisas que a casa não tinha: **uma linha de base**, **uma
comparação honesta** e **uma regra de decisão**. Com as três, "isso está caro?"
vira uma pergunta respondível.

O que ele **não** resolve: não faz a casa comer melhor, não escolhe cardápio,
não substitui saber cozinhar. É um método de compra.

---

## 2. Comece medindo, não economizando

**Primeira regra, e a mais desobedecida: nas primeiras três semanas, não mude
nada.** Compre onde compra, o que compra, como compra. Só registre.

Isso frustra todo mundo, e é inegociável, por dois motivos:

1. **Sem linha de base não existe economia, existe sensação.** Se você mudar de
   mercado na semana 1, nunca vai saber se ficou mais barato ou se aquele mês
   simplesmente teve menos visita.
2. **Um preço é um evento, não um preço.** O arroz a R$ 4,84 pode ser a
   promoção da semana. Decidir em cima disso é chutar com aparência de planilha.

Três semanas é o mínimo para uma casa que compra semanalmente. Casa que compra
por mês precisa de três meses. É chato e não tem atalho.

Enquanto isso, você já ganha alguma coisa: a maioria das pessoas descobre no
primeiro mês pelo menos um item que estava comprando muito acima do normal sem
perceber.

---

## 3. O que registrar

Uma linha por preço observado. Numa planilha, uma linha por vez:

| data | item | mercado | marca | embalagem | qtd | preço total | fonte |
|---|---|---|---|---|---:|---:|---|
| 2026-08-14 | arroz | mercado do bairro | Tio João | 1kg | 1 | 6,99 | nota |
| 2026-08-18 | arroz | atacarejo | Tio João | 5kg | 1 | 27,45 | site |
| 2026-08-14 | óleo | mercado do bairro | Liza | 900ml | 1 | 7,49 | nota |

Os campos que as pessoas erram:

- **embalagem** — é o que carrega a comparação inteira. `900ml`, não "garrafa".
  `c/16`, não "pacote". Se você não anotar o tamanho, a linha não serve.
- **quantidade** — quantas embalagens. Três pacotes de 1 kg por R$ 20 é
  `qtd=3, embalagem=1kg, preço total=20`. Não R$ 20 por pacote.
- **fonte** — de onde veio o número. `nota` (o que foi cobrado de fato), `site`
  ou `app` (o que estava anunciado), `loja` (o que você viu na gôndola). **Preço
  anunciado e preço pago são coisas diferentes** e você vai querer saber qual é
  qual quando os dois discordarem.

Não registre tudo. Registre o que a casa compra sempre e que dói acabar —
tipicamente 15 a 30 itens. Uma planilha de 200 linhas bem mantida vale mais que
uma de 2000 abandonada no segundo mês.

---

## 4. Normalizar — a parte que devolve dinheiro

**Nunca compare etiqueta com etiqueta.** Divida pelo conteúdo primeiro:

```
preço por unidade-base  =  preço total ÷ (quantidade × conteúdo da embalagem)
```

O exemplo que justifica o método inteiro:

| | etiqueta | por litro |
|---|---:|---:|
| Liza 900 ml | R$ 7,49 | **R$ 8,32** |
| Soya 1 L | R$ 7,90 | **R$ 7,90** |

O de baixo tem etiqueta maior e é mais barato. Quem compara etiqueta escolhe
errado, e — esta é a parte cruel — **nunca descobre**, porque nada no recibo
avisa.

A garrafa de 900 ml não é um acidente. Ela existe porque a maioria compara
etiquetas. O mesmo aconteceu com o café que saiu de 500 g para 450 g e depois
400 g, o papel higiênico que saiu de 30 m para 20 m, o achocolatado que saiu de
400 g para 370 g. Chama-se **redução de conteúdo**, é legal, e o Código de
Defesa do Consumidor exige avisar na embalagem — por um período, não para
sempre.

Escolha uma unidade-base por item e nunca misture:

| Tipo de item | Base |
|---|---|
| arroz, feijão, carne, café, sabão em pó | **por quilo** |
| leite, óleo, refrigerante, amaciante | **por litro** |
| ovo, papel higiênico, iogurte em pote | **por unidade** |

Numa planilha isso é uma coluna calculada. É a coluna mais chata e mais
lucrativa da planilha.

---

## 5. A regra de decisão

Aqui está o pulo do gato, e é o que separa este método de "pesquisar preço".

Depois de três semanas você vai ter um mercado mais barato para vários itens. A
tentação é migrar tudo. **Não migre.** Trocar de mercado custa frete, pedido
mínimo, cadastro, o risco de vir errado, e o seu tempo. Perseguir a menor
etiqueta em cinco mercados é como uma casa gasta mais achando que economiza.

Use a **mediana** — o valor do meio, não a média. Assim uma promoção isolada
aparece sem contaminar a decisão.

> **Um mercado só rouba um item do concorrente se passar nos dois testes:**
>
> 1. **Estar pelo menos 8% mais barato** por unidade-base.
> 2. **Ter pelo menos 3 observações** naquele item.

Os dois. Um item 30% mais barato com uma única observação **não migra** — pode
ter sido o dia da liquidação.

De onde vêm os números: 8% num item de R$ 30 comprado quinzenalmente são R$ 62
por ano, o que cobre o incômodo de manter mais um cadastro. 3% não cobre — e
3% é menos que a variação da mesma loja entre terça e sábado.

Ajuste ao seu caso:

- **Suba para 12–15%** se a casa concentra quase tudo num mercado só — cada
  item que sai enfraquece o carrinho principal e pode custar o frete grátis.
- **Desça para 5%** em itens de volume alto e recompra frequente (arroz, ração,
  fralda, sabão), onde o mesmo percentual vale muito mais reais por ano.
- **Nunca abaixo de 3%.** Aí você está dentro do ruído.

E ignore observações com mais de 90 dias. Preço de quatro meses atrás não
descreve o mercado de hoje.

---

## 6. O mercado, não só o preço

Uma ficha por mercado, com os números que transformam desconto em prejuízo:

| Campo | Por que importa |
|---|---|
| **Pedido mínimo** | R$ 150 de mínimo para economizar R$ 7 é um prejuízo de R$ 143 em capital parado |
| **Frete e frete grátis acima de** | come o desconto inteiro de um item só |
| **Formas de pagamento** | ver §7 |
| **Prazo de entrega** | atacarejo de 2 dias não resolve leite acabando hoje |
| **Onde ele mente** | todo mercado tem um padrão: sobe na sexta, só tem preço bom no pacote grande, cobra caro no hortifrúti |

A conta que decide de verdade:

> Levar o arroz para o atacarejo economiza R$ 1,50/kg × 5 kg = **R$ 7,50**.
> O atacarejo tem R$ 150 de mínimo e R$ 12,90 de frete. O resto da lista de lá
> soma R$ 40. **Separar custa R$ 5,40 líquidos.** Fica no carrinho principal
> esta semana; revisita quando a lista do atacarejo crescer.

Um método que produz "compre arroz no atacarejo" sem esse parágrafo é um método
que perde dinheiro com ar de planilha.

---

## 7. Pagamento vem antes de arbitragem

Antes de otimizar centavos por quilo, verifique se a casa tem alguma dessas:

1. **Vale-alimentação.** Se tem, é a alavanca número um, e não chega perto de
   ser disputada. Gastar o saldo do benefício economiza o **valor cheio**, não
   uma porcentagem. Zerar R$ 600 de vale por mês vale mais que qualquer
   arbitragem de preço que este método vai encontrar num ano.
   - A pergunta prática é **onde ele é aceito** — a resposta muda por operadora,
     por rede e por canal (loja física, site próprio, aplicativo de entrega), e
     muda sem aviso. Descubra empiricamente e anote na ficha do mercado.
2. **Cashback ou desconto do banco** que você já tem. Empilha com tudo.
3. **Cartão de loja.** Quase sempre não vale: cada um premia só na própria rede,
   e uma casa que compra em quatro lugares fragmenta em quatro faturas. Só
   compensa se um mercado passar a concentrar mais da metade do gasto.

Ordem de uso por compra: benefício até zerar → cashback/desconto que já existe →
cartão sem anuidade.

Fazer isso direito costuma valer mais que tudo nas seções 4 e 5 juntas, e leva
uma tarde. Faça primeiro.

---

## 8. A despensa e o ponto de recompra

Uma lista do que existe em casa, com um número ao lado: **o ponto de recompra**
— quanto pode sobrar antes de o item entrar na lista.

O ponto de recompra precisa cobrir **o prazo de entrega mais o tempo até a
próxima compra**. Atacarejo que demora 2 dias, compra a cada 15: o ponto tem que
cobrir 17 dias de consumo. Não zero.

Ponto de recompra baixo demais é o que empurra a casa para o mercado da esquina
no preço cheio às nove da noite. **É lá que a economia da planilha morre** —
uma corrida de emergência apaga semanas de arbitragem.

Atualize na hora de guardar a compra. É o único momento em que você já está com
tudo na mão.

---

## 9. A nota fiscal é a fonte de verdade

Preço anunciado é uma alegação. Preço na nota é um fato: é o que foi cobrado
depois da promoção, depois do desconto do clube, depois de o item ter vindo num
tamanho diferente do anunciado.

No Brasil toda venda no varejo gera uma nota fiscal eletrônica ao consumidor
(NFC-e), com data, CNPJ e uma chave de 44 dígitos. Quase ninguém olha a sua. É
o ativo mais valioso deste método e custa zero.

Você pode consultá-las uma a uma pela chave/QR code, ou baixar em lote no portal
da Secretaria da Fazenda do seu estado com a sua conta gov.br. Isso é feito
**por você**, com o seu login — nenhuma ferramenta deve pedir a sua senha de
governo.

Duas armadilhas:

- **O mesmo produto aparece com nomes diferentes** em cada rede (`ARROZ T JOAO
  T1 1KG`, `ARR TIO JOAO TP1 PC 1KG`). Unificar isso é trabalho manual, e é o
  que mais consome tempo no método. Não unifique com pressa: "arroz branco" e
  "arroz integral" são produtos diferentes.
- **A nota mostra tudo que a casa consome** — remédio, bebida, fralda, teste de
  gravidez. É um documento íntimo. Não publique, não versione em repositório
  compartilhado, não mande para ninguém.

---

## 10. A lista e as outras pessoas da casa

Poucas casas têm um decisor único. Lista feita sem a outra pessoa é lista
reescrita no corredor do mercado.

Mande o rascunho antes. E trate as correções como **dados, não como
discussão**: se alguém pede uma marca específica de café, isso não é
preferência a ser negociada toda quinzena — é informação sobre a casa, e vai
para a ficha do item. Assim a mesma discussão não volta no mês seguinte.

Registre também o que **não pode ser substituído**. Alergia é veto absoluto: se
faltou e a alternativa tem o alérgeno, o item volta sem ser comprado, por mais
óbvio que pareça o similar.

---

## 11. O ciclo

**Toda compra:**
1. Conferir a despensa; o que está no ponto entra na lista.
2. Verificar o preço esperado de cada item contra o histórico.
3. Agrupar por mercado; conferir mínimo e frete (§6).
4. Mandar a lista para quem mais decide; ajustar.
5. Comprar.
6. Guardar a compra **e atualizar a despensa na mesma hora**.
7. Registrar os preços da nota.

**Todo mês:**
1. Rodar a regra do §5 sobre tudo. Migrar o que passou nos dois testes.
2. Anotar as decisões e **por quê**. Regra sem motivo é regra que alguém apaga
   por engano daqui a seis meses.
3. Olhar o que subiu de preço. Isso costuma valer mais que a arbitragem: é como
   a casa percebe um aumento antes de ele virar hábito.

---

## 12. O que medir

Não meça só dinheiro. Meça o que você consegue defender:

| Medida | Como |
|---|---|
| Gasto mensal com mercado | soma das notas |
| Gasto por unidade-base nos 10 principais itens | o número que realmente compara meses |
| Compras de emergência | quantas vezes foi ao mercado caro por ter acabado |
| Itens acima da faixa histórica | quantos você pegou antes de comprar |
| Tempo gasto planejando | honestamente |

**Cuidado com a afirmação de economia.** "Economizei 20%" quase sempre compara
com uma linha de base ruim. Meses têm número diferente de visitas, a casa recebe
gente, o preço da carne sobe sozinho. Se quiser afirmar economia, compare o
**gasto por quilo dos mesmos itens** entre períodos — não o total do mês.

O ganho mais defensável costuma não ser dinheiro: é parar de comprar em pânico e
parar de refazer a mesma decisão toda semana.

---

## 13. Os erros que todo mundo comete

1. **Mudar de mercado na primeira semana.** Sem linha de base, você não sabe o
   que aconteceu.
2. **Comparar etiqueta.** §4. É o erro que custa mais dinheiro.
3. **Migrar por uma observação.** A promoção acaba, o preço volta, e você ficou
   com o cadastro.
4. **Ignorar o frete e o pedido mínimo.** §6.
5. **Estocar demais.** Doze unidades baratas que a casa não consome antes de
   vencer são desperdício com cara de economia no recibo.
6. **Registrar tudo.** Você abandona em três semanas. Vinte itens.
7. **Otimizar centavos antes de checar o vale-alimentação.** §7.
8. **Fazer a lista sozinho.** §10.
9. **Deixar a despensa desatualizar.** Aí a lista é ficção com aparência de
   autoridade — pior que não ter lista.
10. **Acreditar na própria porcentagem de economia.** §12.

---

## 14. E o software?

Tudo acima roda numa planilha. Se em algum momento a planilha começar a doer —
normalmente quando passa de uns 30 itens e 3 mercados — as camadas 2 a 4 fazem
exatamente isto e nada além:

| Camada | O que automatiza |
|---|---|
| 2 — a ferramenta | as contas de §4, §5 e §9 |
| 3 — o agente | ler a nota, montar a lista, lembrar da doutrina de §10 |
| 4 — a execução | apertar os botões do aplicativo (precisa de celular dedicado) |

**Nenhuma delas muda o método.** Se a camada 1 não estiver funcionando na sua
casa, automatizá-la só produz erro mais rápido.

→ [Apêndice técnico](03-apendice-tecnico.md) · [As quatro camadas](explicacao/camadas.md)
