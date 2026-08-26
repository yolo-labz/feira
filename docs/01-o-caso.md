# O caso — uma casa em Recife, maio a agosto de 2026

Este documento existe porque alguém perguntou "como você faz isso?". A resposta
honesta precisa incluir o que funcionou, o que quebrou, e o que ainda não está
provado.

Não é um estudo. É um relato de uma casa, com os números que dá para mostrar.

---

## A casa

Dois adultos e três gatos, em Recife. Compra por entrega, quase nunca
presencialmente. Gasto com mercado na casa dos R$ 2.000 por mês, espalhado entre
um hipermercado por aplicativo, um hortifrúti local com entrega semanal, e
compras avulsas em produtores pequenos que vendem por WhatsApp e Instagram.

Duas circunstâncias moldaram o sistema e explicam decisões que de outra forma
pareceriam arbitrárias:

1. **Um protocolo alimentar com prazo clínico** (reconstrução de microbiota
   depois de um curso de antibiótico, junho de 2026) que impunha o que comprar
   e — mais difícil — *quando*. Comprar fibra e fermentado antes da fase certa
   é desperdício, não zelo.
2. **Duas pessoas com preferências diferentes**, uma das quais não usa nenhuma
   das ferramentas. Qualquer coisa que exigisse as duas pessoas operando o
   sistema teria morrido na primeira semana.

## O que existe hoje

Depois de três meses:

| | |
|---|---:|
| Itens com histórico de preço | 27 |
| Perfis de mercado (endereço, frete, mínimo, pagamento, onde ele mente) | 23 |
| Registros de decisão datados no diário | 86 seções |
| Inventários mantidos | despensa, geladeira, freezer, limpeza |

Isso não é um banco de dados. São arquivos de texto num repositório git, que
abrem em qualquer editor e continuam legíveis se todo o resto do projeto
desaparecer. Foi uma escolha deliberada: o ativo é o histórico, e ele não pode
depender de um programa continuar existindo.

## Três coisas que aconteceram

### O pedido de 19 de agosto

16 linhas, 32 unidades, R$ 288,46 no total (R$ 271,48 de produto, R$ 6,99 de
entrega, R$ 9,99 de serviço, gorjeta zero). Montado a partir da despensa e do
histórico, revisado pelas duas pessoas da casa, e conferido na entrega: **16
itens encontrados, 0 substituídos, 0 removidos.**

Dois itens saíram da lista de propósito, e o motivo é mais interessante que o
pedido:

- **Um creme com ureia** que aquele mercado não vende — é item de farmácia. Daria
  para resolver num segundo pedido no mesmo dia. Não foi feito, porque um
  segundo pedido grande no mesmo cartão no mesmo dia é exatamente o que disparou
  o antifraude cinco dias antes.
- **Uma granola** cuja embalagem de 250 g estava indisponível. Entrou a de 500 g
  da mesma marca, sem chocolate, **mais barata por grama** que a que faltou.
  Essa decisão só é possível com preço normalizado.

### O cartão recusado em 14 de agosto

Uma compra foi bloqueada. A leitura fácil era "o cartão tem problema" — e a
resposta reflexa seria tentar outro cartão, que costuma escalar o bloqueio.

O que o registro mostrava: era a **segunda compra grande no mesmo cartão no
mesmo dia**. Regra de volume do antifraude, não problema de cartão. A conduta
foi esperar. O bloqueio caiu sozinho em cerca de 26 horas, sem ligação para o
banco e sem cartão novo.

Isso não é sagacidade. É consequência de ter um registro datado do que
aconteceu antes. Sem ele, a casa teria trocado de cartão e aprendido a lição
errada.

### A cozinheira

Em julho a casa contratou uma cozinheira quinzenal — 30 marmitas a cada 15
dias, R$ 350 de mão de obra, compras por conta da casa. Isso mudou a natureza do
problema: a compra deixou de ser "o que a gente vai comer" e virou **uma lista
fechada derivada de um cardápio**, com quantidades calculadas a partir de
fatores de cocção (quanto 1 kg de frango cru vira de frango pronto).

Também produziu o erro mais instrutivo do período. O sistema tinha acumulado
regras de cardápio derivadas de um restaurante que a casa frequentava — e a
outra pessoa da casa **não gosta de lá**. Metade das restrições que o assistente
vinha aplicando eram inferências erradas sobre gosto alheio, sustentadas por
meses porque nunca foram checadas com a pessoa. Foram anuladas em bloco.

**A lição é sobre o método, não sobre comida:** um sistema que infere
preferências a partir de comportamento observado vai construir uma teoria
confiante e errada sobre alguém que nunca foi consultado. Preferência de outra
pessoa é dado que se pergunta, não que se deduz.

## O que quebrou

Lista incompleta, dos três meses:

- **Um segundo aparelho Android respondendo na rede** absorveu comandos
  silenciosamente e devolveu telas vazias — que é indistinguível de um script
  quebrado, e custou uma sessão inteira de depuração.
- **A janela de "item em falta" do aplicativo** tem as opções dispostas na
  horizontal, e a opção de reembolso só aparece depois de arrastar o carrossel.
  Sem isso o fluxo trava. Matou uma tentativa inteira de pedido em 18/08.
- **Outro aplicativo sequestrando o primeiro plano** por deep link no meio da
  operação.
- **Portal da Secretaria da Fazenda** com autenticação de dois fatores que expira
  e um formulário que muda sem aviso.

Nenhuma dessas é uma falha de arquitetura. É o custo corrente de automatizar
software de terceiros que não pediu para ser automatizado, e ele não diminui com
o tempo. **É o principal motivo para não vender isto como serviço hoje.**

## O que ainda não está provado

Esta seção é mais importante que todas as anteriores.

**A economia não está medida.** O que existe é um pedido de R$ 288,46 que
aconteceu — não uma comparação contra o que a mesma casa teria gasto sem o
sistema. Um número de economia exige um contrafactual, e a casa não construiu
um. Qualquer porcentagem citada aqui seria invenção.

O que dá para afirmar com os registros na mão:

- **Um erro de comparação foi eliminado**, e ele é sistemático: por litro, por
  quilo, por rolo. Isso é verificável na aritmética, não na sensação.
- **A regra de migração impediu trocas de mercado** que teriam custado frete
  para ganhar 5%. Recusar uma mudança também é resultado, e é o resultado mais
  frequente.
- **As compras de emergência caíram**, porque a despensa tem ponto de recompra.
  Não foi contado, mas está no diário.

**A parte generalizável é pequena.** Muito do que funciona aqui depende desta
casa: estes mercados, este bairro, esta restrição clínica, estas duas pessoas.
O método do [documento 2](02-o-metodo.md) é o que se transporta. O resto é
configuração.

**Nunca foi instalado por outra pessoa.** Todo o software foi escrito por quem
o usa, que também é o suporte técnico dele, com paciência infinita e nenhuma
expectativa de tempo de resposta. Isso é uma condição extraordinariamente
favorável e ela não sobrevive ao segundo usuário.

**A automação de pedido precisa de um celular Android dedicado**, e a casa não
tem um sobrando — divide com uso normal, o que é fonte de metade dos problemas
listados acima. Esse é hoje o gargalo real da camada 4, e é a razão de o
projeto ser distribuído com a camada 4 marcada como opcional.

## O que seria preciso para afirmar mais

Para dizer que o método funciona, e não apenas que funcionou aqui:

1. Oito a doze semanas de operação em pelo menos duas casas que não a original.
2. Um período de linha de base medido antes, na mesma casa.
3. Comparação de **gasto por unidade-base nos mesmos itens** entre períodos —
   não de total mensal, que varia por motivos demais.
4. Tempo de instalação e de suporte medido por casa.
5. Nenhum incidente de compra não autorizada, alergia ou vazamento de dado.

Nada disso existe. É o desenho do experimento, não o resultado.

---

## Por que isto está publicado

Três motivos, em ordem de honestidade:

1. **Uma professora pediu.** O pedido veio de fora do mundo de software, o que é
   o melhor teste possível: se o método não for legível para quem não programa,
   ele não é um método, é um hábito pessoal com scripts.
2. **O documento força o rigor.** Escrever "a economia não está medida" é mais
   difícil do que continuar não medindo.
3. **A parte que interessa é gratuita para copiar.** O
   [método](02-o-metodo.md) roda numa planilha, e a maior parte do valor está
   nele. O software só automatiza a aritmética.

→ **[Leia o método](02-o-metodo.md)** — é o documento que serve para fazer.
