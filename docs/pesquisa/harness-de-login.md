# Como o agente entra nas contas — pesquisa e decisão

**Data:** 25/08/2026
**Pergunta:** que harness pronto dá para incorporar para que um usuário comum
conecte as próprias contas de mercado, sem entregar senha e sem saber o que é
uma porta de depuração?

Duas frentes de pesquisa paralelas (uma sobre automação de navegador, outra
sobre Android sem aparelho físico). As duas chegaram na mesma conclusão por
caminhos diferentes.

---

## Decisão

1. **A extensão de navegador é o harness de login.** O usuário já está logado;
   a extensão lê a página que ele está vendo. Não existe senha para guardar,
   não existe sessão para sincronizar, não existe detecção de robô para
   contornar — porque não há robô, há o próprio usuário navegando.
2. **A camada 4 por aplicativo Android continua exigindo aparelho físico.** Não
   tem contorno. Ver a seção sobre atestação abaixo.
3. **A versão 1 aceita entrada manual como caminho principal**, e isso não é
   uma limitação envergonhada — é a arquitetura correta enquanto não houver
   segundo usuário.
4. **Nada de root, Magisk ou burla de atestação.** Nunca, nem na documentação.

---

## Frente 1 — automação de navegador

Onze famílias avaliadas: Playwright puro e `storageState`, CDP anexado ao
navegador do próprio usuário, Playwright MCP e Chrome DevTools MCP,
browser-use, Stagehand/Browserbase, Skyvern, infraestrutura hospedada
(Steel.dev, Hyperbrowser, Anchor), Selenium com undetected-chromedriver,
nodriver e SeleniumBase UC, forks anti-detecção (Patchright, rebrowser-patches,
camoufox), modelos de uso-de-computador, e extensão/userscript.

### O ranking depende de quem instala

| Perfil | 1º | 2º | 3º |
|---|---|---|---|
| **Não-programador** | extensão de navegador, um mercado por vez | importação manual | Playwright empacotado com assistente de login |
| **Desenvolvedor** | Playwright com perfil persistente | CDP anexado a um perfil dedicado | extensão |

Infraestrutura hospedada e frameworks de agente ficam no fim para os dois
perfis: resolvem engenharia, não resolvem o problema difícil — que é o usuário
estabelecer uma sessão confiável na conta dele.

### Por que a extensão ganha

- O usuário **já está logado**. Passkey, 2FA e vínculo de dispositivo continuam
  funcionando normalmente, porque nada foi contornado.
- **Nenhuma credencial trafega.** Sem senha, sem TOTP, sem cookie exportado, sem
  perfil remoto. Isso elimina de uma vez a maior fonte de exposição jurídica do
  projeto (ver [jurídico](juridico.md)).
- **O mercado vê o navegador de sempre** — mesmo IP, mesmo histórico, mesmas
  fontes, mesmo comportamento. Não há fingerprint de automação para detectar.
- **Instalação é um clique**, contra "abra o terminal e lance o Chromium com uma
  porta de depuração".

### Por que a extensão é chata mesmo assim

Isto é o contra-argumento honesto, não uma ressalva de rodapé:

- Chrome, Firefox, Edge e Safari têm APIs e permissões diferentes.
- Manifest V3 restringe lógica em segundo plano e interceptação de rede.
- Revisão de loja pode rejeitar permissões amplas ou leitura de dado financeiro.
- Distribuição fora de loja cria problema de atualização e de confiança.
- **Cada mercado tem um DOM diferente e muda sem aviso.** É um adaptador por
  mercado, para sempre.

**Veredito:** extensão como superfície de login e captura, com escopo estreito
na v1 — captura o que o usuário mandar capturar, na página que ele está vendo.
Nada de promessa de varredura universal.

### O teto que nenhum harness resolve

- Sites que proíbem automação nos termos de uso. Um scraper que funciona ainda
  pode ser uma dependência inaceitável.
- Seletores quebram. Mercados mudam componentes, fluxos e layout de recibo o
  tempo todo.
- Defesas anti-robô são em camadas (JS, TLS, reputação de IP, histórico da
  conta, tempo de interação). Bibliotecas "indetectáveis" cobrem um subconjunto.

Estimativa de manutenção, *não verificada mas raciocinada*: **20 a 60 horas por
mercado por ano** para um adaptador simples de leitura; 60 a 150+ para um
mercado difícil ou portal de governo. Esse número é o motivo de a v1 ser
estreita — e é o principal argumento contra vender isto como serviço hoje.

---

## Frente 2 — Android sem aparelho físico

Dez opções avaliadas: emulador oficial (AVD), Waydroid, redroid, Genymotion
(desktop e nuvem), Anbox, BlueStacks/LDPlayer/MEmu, Android-x86/Bliss OS, WSA,
fazendas de dispositivos na nuvem, e aparelho físico controlado remotamente.

### O muro da atestação

O Play Integrity API (sucessor do SafetyNet) devolve ao aplicativo um veredito
sobre o dispositivo, em três níveis:

| Nível | O que significa |
|---|---|
| `MEETS_BASIC_INTEGRITY` | sem sinal óbvio de adulteração — emulador às vezes passa |
| `MEETS_DEVICE_INTEGRITY` | build **certificado pelo Google** em hardware reconhecido — é este que os apps exigem |
| `MEETS_STRONG_INTEGRITY` | atestado **pelo hardware** (TEE), bootloader travado |

**Um emulador não consegue produzir `DEVICE_INTEGRITY`, e isso não é um bug a
ser contornado — é o desenho.** A verificação é do lado do servidor: o Google
confere se a assinatura do build e a impressão do hardware batem com um
dispositivo certificado. Máquina virtual não tem TEE para assinar a cadeia.
Nenhuma configuração muda isso.

### O que acontece na prática

Num aplicativo de entrega com cartão salvo, rodando em emulador [raciocinado,
não testado]:

| Etapa | Resultado |
|---|---|
| Instalar | ✅ funciona |
| Abrir | ✅ funciona |
| Logar | ⚠️ às vezes — costuma travar no SMS (emulador não tem SIM) |
| **Pagar** | ❌ **quase certamente não** |

E o modo de falha é pior que uma recusa limpa: a conta é marcada de risco, o
pedido é cancelado, a conta pode ser restringida. Ou seja, tentar custa a conta
que o usuário já tinha.

### Tabela de decisão

| Opção | Veredito | Motivo |
|---|---|---|
| Emulador AVD (qualquer imagem) | **morto** | falha atestação no passo do pagamento |
| Waydroid, redroid | **morto** | build não certificado |
| Genymotion (desktop e nuvem) | **morto** | a nuvem também é emulador, não aparelho |
| Anbox / Anbox Cloud | **morto** | abandonado ou corporativo, não certificado |
| BlueStacks, LDPlayer, MEmu | **morto** | fingerprint de emulador mais conhecido do mercado |
| Android-x86 / Bliss OS | **morto** | mesmo muro |
| WSA | **morto** | descontinuado pela Microsoft |
| Fazenda de dispositivos na nuvem | marginal | aparelho real passa, mas sessão é efêmera e IP é de datacenter |
| **Site do mercado no navegador** | **viável** | **não existe atestação na web** |
| **Aparelho físico dedicado** | **viável** | único caminho que loga e paga com fidelidade |

### Sobre root e Magisk

Em hardware real com bootloader destravado, módulos de correção de integridade
historicamente passavam pelo nível básico e às vezes pelo de dispositivo. Em
emulador, é beco sem saída.

**A recomendação é firme: não fazer, não documentar, não sugerir.** É uma corrida
armamentista contra o Google que o projeto perde; viola os termos de uso e leva
a banimento; e, decisivamente, **instrui um consumidor a enfraquecer a segurança
do próprio telefone** — num aparelho que provavelmente tem o banco dele
instalado. Um projeto cuja premissa é ajudar famílias a cuidar do dinheiro não
pode ter esse parágrafo no manual.

### A saída pela web

Não existe Play Integrity na web. O Carrefour é varejista de e-commerce com loja
completa e checkout por cartão e Pix; o iFood tem fluxo web funcional; a
presença web do Rappi no Brasil é fina e o pedido é, na prática, primeiro-app.
[não verificado — conferir por mercado antes de implementar, não assumir]

Isso torna a **automação do site**, não do aplicativo, o único caminho que é ao
mesmo tempo só-software e capaz de fechar um pedido pago. Entra como módulo
opcional e experimental, com desistência para o humano em qualquer CAPTCHA —
nunca como padrão.

---

## O que isso muda no projeto

| Antes | Depois |
|---|---|
| camada 4 = automação do app Android | camada 4 se divide: **4a web** (viável, opcional) e **4b app** (exige aparelho físico) |
| login = CDP anexado a um Chromium lançado à mão | login = **extensão**, porque o usuário já está logado |
| entrada manual era o modo degradado | entrada manual é o **modo principal da v1** |
| aparelho Android era um obstáculo a resolver | aparelho Android é um **requisito de hardware declarado**, de um recurso opcional |

A quarta linha é a mais importante para quem for instalar isto: **não falta
nada essencial se você não tiver um celular sobrando.** Falta o último passo de
um recurso que representa a menor parte do valor.
