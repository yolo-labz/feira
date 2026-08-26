# Pesquisa

Seis frentes de pesquisa rodadas em 25/08/2026 para decidir como empacotar este
projeto. Sínteses, não transcrições. Onde as frentes discordaram, está marcado.

Todas foram feitas por modelos de linguagem, sem acesso a fonte primária.
Números não verificados estão marcados como tal. **Nada aqui substitui
advogado, contador ou medição real.**

| Documento | Pergunta | Decisão que saiu dali |
|---|---|---|
| [Harness de login](harness-de-login.md) | como o agente entra nas contas? | **extensão de navegador**; camada 4b exige celular físico; emulador é inviável |
| [Mercado e produto](mercado-e-produto.md) | dá para vender? para quem? | **caminho acadêmico primeiro**; SaaS hospedado é armadilha |
| [Jurídico](juridico.md) | qual a exposição? | **local-first + sem custódia de credencial** elimina quase tudo |

## As quatro conclusões que mudaram o projeto

1. **A extensão resolve o login por não ter um.** O usuário já está logado; a
   extensão lê a página que ele está vendo. Sem senha, sem sessão sincronizada,
   sem detecção de robô — porque não há robô.
2. **Emulador Android está morto para este caso.** Play Integrity é verificação
   do lado do servidor contra hardware certificado. AVD, Waydroid, redroid,
   BlueStacks e afins falham **no passo do pagamento**, e o modo de falha marca
   a conta de risco. Celular físico certificado é o único caminho, e por isso a
   camada 4b declara hardware em vez de fingir que não precisa.
3. **O caminho acadêmico vale mais que o de consumidor por 12 meses.** Público
   que já pediu documentação, retorno de quem não programa, e um contexto onde
   limitação é aceitável — antes de assumir responsabilidade por compra alheia.
4. **A esteira de manutenção é o centro de custo, não o código.** 20 a 60 horas
   por mercado por ano [estimado] só para acompanhar mudança de layout. É a
   razão principal para não vender serviço hoje.

## O que a pesquisa disse que o projeto preferiu não ouvir

Registrado por honestidade:

- **"Comece sem automação nenhuma."** Uma frente argumentou que a v1 deveria ser
  só importação manual, e que raspagem e automação de app são obrigação de
  manutenção permanente contraída cedo demais. O projeto ficou entre os dois:
  entrada manual é o caminho principal, a extensão é opcional, e a camada 4b é
  declaradamente para quem tem o hardware.
- **"Execução de pedido não é diferencial, é passivo."** Verdade, e mantida
  assim mesmo — com o portão de pagamento aplicado em código, e não como pedido
  educado na documentação.

## O que ninguém verificou

- Nenhuma economia medida contra linha de base controlada.
- Nenhum preço de mercado validado com cliente real.
- Nenhuma confirmação jurídica com profissional.
- Nenhuma verificação de paridade de checkout web por mercado.
- Nenhuma instalação por outra pessoa.

Os cinco são pré-requisito para qualquer afirmação comercial.
