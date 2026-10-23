# LinkedIn: plano de conteúdo e rede (8 semanas)

Objetivo: ser lembrado como **"o cara de SAP FSM / SSAM / BTP"** por recrutadores, consultorias e pela comunidade SAP.
Ritmo: **2 posts por semana** (terça e quinta, por volta das 8h no horário de Brasília) e **15 minutos por dia** comentando.

> ⚠️ **Antes de citar clientes em posts**, confirme com a Intechpro o que pode ser dito. No perfil e no site os nomes já aparecem, mas em posts é mais seguro falar do *aprendizado* do que de detalhes do cliente. Na dúvida, escreva "um cliente do setor de energia".

## Os 4 pilares

| Pilar | Do que fala | Por que funciona |
|---|---|---|
| **Bastidores de implementação** | go-live, hypercare, o que deu errado e como resolveu | é o conteúdo mais raro e o que recrutadores mais valorizam |
| **Dica técnica FSM / SSAM** | regras de negócio, Dynamic Forms, painel de planejamento, consultas | mostra profundidade e atrai a comunidade |
| **BTP e integração** | Proaxia, Cloud Connector, Kyma, Identity Services | reforça o BTP como especialidade principal |
| **Carreira: do código ao campo** | sua trajetória de dev a consultor SAP | gera conexão e é a sua história única |

## Calendário

| Semana | Terça | Quinta |
|---|---|---|
| 1 | **Post 1**: apresentação "Do código ao campo" (abaixo) | **Post 2**: FSM ou SSAM? (abaixo) |
| 2 | **Post 3**: 5 mil ordens por dia (abaixo) | Dica: 1 regra de negócio do FSM que você usa sempre (print com dados fictícios) |
| 3 | Bastidores: o primeiro dia de um go-live, contado hora a hora | BTP: como o Cloud Connector liga a nuvem ao sistema do cliente (diagrama simples) |
| 4 | Carreira: o que um desenvolvedor precisa aprender para entrar no SAP | Dica: SAP Dynamic Forms, 3 boas práticas para checklists de campo |
| 5 | Bastidores: o erro mais comum em integração FSM ⇄ S/4HANA | Certificação: como você estudou para a certificação FSM (material, tempo, dicas) |
| 6 | Dica: consultas avançadas no FSM (Query API / CoreSQL) com um exemplo | BTP: Cloud Identity Services, login único para técnicos de campo |
| 7 | Bastidores: treinar 500 usuários, o que funciona e o que não funciona | Carreira: trabalhar remoto do Acre para clientes do Brasil inteiro |
| 8 | Retrospectiva: "8 semanas postando sobre SAP FSM: o que aprendi" | Pergunta aberta para a comunidade: "qual o maior desafio no seu projeto FSM?" |

**Formatos que performam melhor:** carrossel em PDF (5–8 slides) para as dicas técnicas, texto curto com 1 imagem para bastidores, e enquete de vez em quando. Evite colocar link no corpo do post; se precisar, coloque no primeiro comentário.

---

## Post 1: apresentação (semana 1, terça)

```
Escrevi meu primeiro sistema aos 16 anos.
Era um sistema de gestão para um consultório odontológico em Rio Branco, no Acre.

Mais de dez anos depois, faço a mesma coisa em outra escala: transformar processos manuais em sistemas que funcionam. Só que agora o "consultório" tem centenas de técnicos de campo e milhares de ordens de serviço por dia.

Hoje sou consultor técnico SAP e trabalho com:
▸ SAP Field Service Management (FSM)
▸ SAP Service and Asset Manager (SSAM)
▸ SAP BTP e integrações com S/4HANA

O que a base de desenvolvedor me deu foi entender os dois lados: o técnico que está no campo com o celular na mão e o time de TI que vai sustentar a solução depois do go-live.

A partir de agora, vou compartilhar por aqui o que aprendo em implementações de FSM, SSAM e BTP: bastidores, dicas técnicas e erros que ninguém conta.

Se você trabalha com Field Service ou com o ecossistema SAP, vamos nos conectar. 🤝

#SAP #SAPFSM #SAPBTP #FieldService #S4HANA
```

📷 Imagem: sua foto ou o banner do perfil.

---

## Post 2: FSM ou SSAM? (semana 1, quinta)

```
"Qual a diferença entre SAP FSM e SAP SSAM?"

Ouço essa pergunta em quase todo projeto. A resposta curta:

🔧 SAP Field Service Management (FSM)
▸ Solução em nuvem para gestão de serviço em campo
▸ Forte em planejamento e despacho: painel de planejamento, agenda, otimização
▸ Integra com S/4HANA e ECC (por exemplo, com o conector Proaxia)
▸ Ideal para operações de serviço com muitos técnicos e muitas ordens por dia

🏭 SAP Service and Asset Manager (SSAM)
▸ App móvel para manutenção, rodando direto sobre o SAP PM / EAM
▸ Forte no ativo: equipamentos, locais de instalação, notificações, medições
▸ Funciona offline, o que é essencial em área industrial ou remota
▸ Ideal para manutenção de planta e de ativos

Resumindo: FSM olha para o serviço e o despacho; SSAM olha para o ativo e a manutenção.
E em alguns cenários os dois convivem.

Já implementei os dois. Na sua empresa, qual faz mais sentido? 👇

#SAP #SAPFSM #SSAM #EAM #FieldService
```

📷 Ideal: carrossel de 3 slides (FSM | SSAM | quando usar cada um).
✅ Revise os tópicos com a sua experiência antes de publicar.

---

## Post 3: 5 mil ordens por dia (semana 2, terça)

```
5.000 ordens de serviço por dia.

Esse é o volume de um dos projetos de SAP FSM em que trabalhei. Nessa escala, cada detalhe da configuração vira problema ou solução em poucas horas.

3 lições que levo para todo projeto:

1️⃣ [Lição 1: ex.: regra de negócio mal pensada em 1 ordem vira problema em 5 mil]

2️⃣ [Lição 2: ex.: o painel de planejamento só funciona se os dados mestres estiverem limpos]

3️⃣ [Lição 3: ex.: o go-live não termina no go-live; a estabilização é onde o projeto se prova]

Implementar FSM não é só configurar: é entender como a operação respira.

Quem trabalha com operações de alto volume: o que você acrescentaria? 👇

#SAP #SAPFSM #FieldService #GoLive #S4HANA
```

✏️ **Preencha as 3 lições com casos reais seus.** Escrevi exemplos genéricos só para mostrar o formato. O post só funciona se a experiência for sua.

---

## Rotina de rede (sair de 129 para 500+ conexões qualificadas)

**Toda semana (≈ 30 min):**
- Envie **15 convites** com nota personalizada para:
  - recrutadores e *talent acquisition* de consultorias SAP (busque "recrutador SAP", "SAP recruiter", "talent acquisition SAP");
  - consultores e líderes de **SAP FSM, SSAM e BTP** (busque esses termos em "Pessoas");
  - pessoas da SAP e de parceiros (Proaxia, consultorias Gold/Platinum).
- Siga as páginas: **SAP**, **SAP Field Service Management**, **SAP BTP**, **SAP Community**, **Proaxia**.
- Entre em 2–3 grupos de SAP FSM / SAP BTP e comente lá.

**Todo dia (≈ 15 min):** comente em 3 posts de pessoas do nicho com um comentário que acrescente algo (uma experiência sua, uma pergunta), nunca só "parabéns".

**Modelos de nota de convite** (limite: 200 caracteres):

```
Olá, [nome]! Sou consultor técnico SAP FSM/SSAM/BTP e acompanho seu trabalho com [tema]. Seria ótimo trocar experiências por aqui. Abraço!
```

```
Olá, [nome]! Vi que você recruta para projetos SAP. Atuo com FSM, SSAM e BTP de ponta a ponta. Fico à disposição para oportunidades na área!
```

```
Hi [name]! I'm an SAP FSM/SSAM/BTP technical consultant from Brazil. I'd love to connect and exchange experiences on field service projects.
```

**Recomendações:** depois de ativar a da Lilian, peça mais 2 ou 3 a pessoas de projetos diferentes (um gestor de cliente, um colega técnico). Peça com uma sugestão de tema, por exemplo: *"se puder, comente como foi o go-live da Armac"*.
