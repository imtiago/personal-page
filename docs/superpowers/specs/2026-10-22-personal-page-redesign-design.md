# Página pessoal — Tiago Oliveira (redesign)

**Data:** 2026-10-22
**Status:** aguardando revisão
**Mockups de referência:** `.superpowers/brainstorm/721800-1792700460/content/` (`full-page-v3.html`, `nav-v2.html`, `diagram.html`)

## 1. Objetivo

Criar uma página de apresentação que posicione Tiago como **Consultor Técnico SAP FSM / SSAM e SAP BTP**, com desenvolvimento de sistemas como competência de apoio. Ela deve ser agradável, chamativa, intuitiva e tecnológica.

**Público (com o mesmo peso):**
- Clientes (empresas que contratam implementação SAP ou um sistema sob medida)
- Recrutadores e consultorias (vagas CLT/PJ)

**Sucesso significa:**
- Em 5 segundos, o visitante sabe quem é Tiago e o que ele faz (FSM/SSAM + BTP).
- Fica fácil entrar em contato (WhatsApp, e-mail, agendamento) e baixar o CV.
- O site funciona bem no celular, carrega rápido e aparece no Google em PT, EN e ES.

**Fora do escopo desta versão:** a reformulação do LinkedIn (projeto seguinte, que reaproveita textos e identidade daqui), páginas próprias para cada case, blog, easter egg `Ctrl+K` e modo claro.

## 2. Identidade visual

- **Tema:** apenas escuro. Fundo `#060f1f` com grid sutil ("blueprint") e gradiente "aurora" azul/roxo que se move lentamente.
- **Cores:** azul SAP `#3b9cff` (primária), roxo `#8b5cf6` e ciano `#38bdf8` (gradiente), texto `#e8f1ff`, texto secundário `#9fb6d6` e verde `#34d399` para o status "disponível".
- **Tipografia:** Space Grotesk nos títulos e números, e Inter no corpo. As duas são auto-hospedadas via `@fontsource`.
- **Componentes:** cartões de vidro (glassmorphism), chips (os destacados com gradiente), botão primário com gradiente e botão secundário com contorno.
- **Ícones:** SVG (Lucide). Emojis não são usados.

## 3. Estrutura da página

Esta é a ordem final, já com os ajustes pedidos durante o brainstorm.

| # | Seção | Conteúdo |
|---|---|---|
| 0 | **Menu** | Seletor de idioma 🌐 PT/EN/ES à **esquerda**, links à direita. **Não exibe o nome/logo.** Fica fixo com efeito de vidro ao rolar, destaca a seção atual e tem uma barra de progresso de leitura. No celular: idioma à esquerda e ☰ à direita. |
| 1 | **Início** | Status "Disponível para novos projetos" (configurável), nome gigante "Tiago / **Oliveira**" (com gradiente) e a frase *"Transformo operações de campo com SAP FSM/SSAM e conecto tudo na nuvem com SAP BTP"*, com a especialidade alternando por animação de digitação. Botões: "Vamos conversar" e "Baixar CV". **Crachá de vidro** à direita: avatar, nome, "Consultor SAP · Rio Branco, AC", números (5+ anos · 5 projetos SAP · 4 certificações, com contagem animada) e chips. Abaixo, a faixa "Projetos em": MINASLIGAS · PLUZ · ARMAC · NORTE ENERGIA · WPS, em texto e sem logos. |
| 2 | **Expertise** | Três cartões: **SAP FSM/SSAM**, **SAP BTP** e **Desenvolvimento de sistemas**, cada um com 4 entregas. Os cartões têm um brilho que segue o cursor. |
| 3 | **Como tudo se conecta** | Diagrama animado S/4HANA ⇄ SAP BTP ⇄ SAP FSM/SSAM ⇄ Técnico em campo. Ao passar o mouse ou tocar num bloco, abre um painel com o que Tiago faz ali. No celular, o diagrama fica vertical. |
| 4 | **Como eu trabalho** | 01 Diagnóstico → 02 Configuração & regras → 03 Testes & validação → 04 Go-live & suporte. |
| 5 | **Projetos** | Quatro cases em destaque no formato desafio → entrega (→ resultado, quando houver número): **Minasligas** (SSAM, 2026), **Pluz** (FSM + Proaxia, 2025–26), **Armac** (FSM + Proaxia, 2024–25) e **Sistema de Gestão Comercial e Estoque** (etiqueta "Desenvolvimento", com link para o GitHub). Linha do tempo com **Norte Energia** (2024) e **WPS** (2023). **A Seal Telecom foi removida.** |
| 6 | **Certificações** | Quatro selos: Fiori Application Developer (Associate), Field Service Management, SAP Build Developer e Business Data Cloud, cada um com "Verificar ↗" (Credly). Abaixo, os 8 cursos SAP numa linha compacta. |
| 7 | **Recomendações** | Citação em destaque de **Lilian Amélia Pereira**, Sócia e Líder Técnica SAP (supervisora direta). Vira carrossel quando houver mais de uma recomendação. |
| 8 | **Sobre mim** | Título "Do código ao **campo**." com o texto aprovado (seção 8 deste documento). Mini linha do tempo: 2012 Primeiro sistema → 2019 SEPLAG-AC → 2021 Entrada no SAP → Hoje FSM · SSAM · BTP. Cartões de Formação (Sistemas de Informação, UFAC · Técnico em Informática, IFAC) e Idiomas (Português nativo · Inglês intermediário · Espanhol intermediário). |
| 9 | **Contato** | Título "Vamos tirar o seu **projeto do papel?**" (sem "SAP"). Botões: WhatsApp, E-mail, LinkedIn, Agendar 30 min e Baixar CV. |
| — | **Rodapé** | © ano · links (GitHub, LinkedIn). |
| — | **Botão flutuante** | WhatsApp, fixo no canto inferior direito. |

## 4. Arquitetura

**Stack:** Astro (versão estável atual) + Tailwind CSS + TypeScript, gerando um site 100% estático.

```
src/
  pages/
    index.astro          → /    (pt)
    en/index.astro       → /en
    es/index.astro       → /es
  layouts/Base.astro     → <head>, SEO, fontes, Analytics
  components/
    Nav, LanguageSwitcher, Hero, ProfileCard, ClientStrip,
    Expertise, ConnectDiagram, Process, Projects, Certifications,
    Testimonials, About, Contact, Footer, WhatsAppButton
  content/
    i18n/{pt,en,es}.json → textos fixos da interface
    profile.ts           → nome, contatos, links, status "disponível", números do crachá
    projects.ts          → projetos (campos traduzidos por idioma)
    certifications.ts    → certificações + cursos + URLs do Credly
    testimonials.ts      → recomendações
  scripts/               → JS mínimo (menu, animações, contadores, diagrama)
  assets/                → avatar.png, imagens (otimizadas pelo Astro)
public/
  cv/                    → PDFs do CV (pt, es; en quando existir)
  og/                    → imagens de prévia de link (uma por idioma)
  favicon.svg
```

**Princípios:**
- **Conteúdo separado do layout.** Para adicionar um projeto, edita-se só o `projects.ts`.
- **Os dados são tipados com Zod.** Se faltar a tradução de um campo obrigatório em algum idioma, o **build falha** em vez de publicar um texto vazio.
- **As três páginas usam o mesmo componente** `HomePage`, que recebe o `lang`. Não há HTML duplicado.
- **Melhoria progressiva:** todo o conteúdo está no HTML gerado. O JavaScript só adiciona animações e interações, e o site funciona inteiro sem JS.

**Idiomas:**
- O seletor usa links reais (`/`, `/en`, `/es`). As tags `hreflang` e `<html lang>` são definidas por página.
- Na primeira visita, se o idioma do navegador for EN ou ES e o visitante estiver em `/`, aparece um aviso discreto ("View in English?"). **Não há redirecionamento automático.** A escolha fica salva em `localStorage`.
- As traduções EN/ES são escritas por Claude e revisadas por Tiago. A recomendação da Lilian aparece em PT nas três versões, com uma tradução abaixo marcada como "(tradução)".

**Interações (JS próprio, sem bibliotecas pesadas):**
- Texto do hero com efeito de digitação: FSM → SSAM → BTP.
- Contadores animados no crachá.
- Aurora animada (CSS), brilho dos cartões seguindo o cursor e revelação das seções ao rolar (IntersectionObserver).
- Menu fixo com seção ativa e barra de progresso.
- Diagrama: pontos de luz em CSS e painel controlado por hover, foco ou toque. Os blocos são `<button>`, para funcionar também pelo teclado.
- **`prefers-reduced-motion`** desliga todas as animações: o texto fica fixo, os números aparecem já prontos e a aurora fica parada.

**Integrações externas:**
- **Agendamento:** link para o Cal.com ou Calendly de Tiago (abre em nova aba, sem embed).
- **Estatísticas:** Vercel Web Analytics (sem cookies e sem banner).
- **WhatsApp:** link `wa.me` com uma mensagem inicial pré-preenchida, no idioma da página.

## 5. Publicação, SEO e desempenho

- **Hospedagem:** Vercel, com deploy automático a cada push no `master` e preview em cada branch/PR.
- **Domínio próprio:** recomendado (ex.: `tiagooliveira.dev`). A escolha e o registro ficam com Tiago, e o site funciona no subdomínio da Vercel até lá.
- **SEO:** `<title>` e `meta description` por idioma, `hreflang`, `sitemap.xml` (`@astrojs/sitemap`), `robots.txt` e dados estruturados `Person` (JSON-LD) com `jobTitle`, `knowsAbout` e `sameAs` (LinkedIn, GitHub).
- **Prévia de link:** imagem Open Graph 1200×630 por idioma, com avatar, nome e "Consultor SAP FSM · SSAM · BTP", no mesmo visual do site.
- **Metas:** Lighthouse ≥ 95 em Performance, Acessibilidade, Boas práticas e SEO (mobile). JS total < 15 KB gzip. Fontes com `font-display: swap` e pré-carregadas.

## 6. Acessibilidade

- Contraste AA em todo o texto (ver item de verificação 6).
- Navegação completa pelo teclado, com foco visível, e link "Pular para o conteúdo".
- `alt` em todas as imagens. O diagrama tem uma descrição textual para leitores de tela.
- Os botões de idioma usam `aria-current` e `lang` próprio (`<a lang="en">EN</a>`).

## 7. Verificação

1. `astro check` e `astro build` sem erros (inclui a validação Zod dos dados e das traduções).
2. Screenshots com Chrome headless em 375, 768 e 1440 px, nas três línguas, revisados visualmente.
3. Lighthouse (mobile) na página `/` publicada no preview da Vercel, atingindo as metas da seção 5.
4. Checagem de links (internos, CV, Credly, WhatsApp, LinkedIn, GitHub).
5. Teste com `prefers-reduced-motion` ativado e com JavaScript desativado: todo o conteúdo precisa estar visível.
6. Contraste verificado nas combinações de cor usadas.
7. Prévia de link verificada com o depurador de compartilhamento do LinkedIn e no WhatsApp.

## 8. Conteúdo aprovado

**Hero:** "Transformo operações de campo com **SAP FSM/SSAM** e conecto tudo na nuvem com **SAP BTP**."

**Sobre mim — "Do código ao campo."**
> Escrevi minha primeira solução aos 16 anos: um sistema de gestão para um consultório odontológico em Rio Branco (AC). Desde então, faço a mesma coisa em escalas cada vez maiores: transformar processos manuais em sistemas que funcionam.
>
> Passei pela Secretaria de Planejamento do Acre e por projetos como desenvolvedor freelancer até encontrar, em 2021, o ponto em que tecnologia e operação se encontram: o ecossistema SAP. Hoje conduzo implementações de SAP FSM, SSAM e SAP BTP de ponta a ponta, da configuração e das regras de negócio às integrações com S/4HANA, ao go-live e à capacitação das equipes.
>
> Minha base de desenvolvedor faz diferença: entendo o processo de quem está em campo, falo a língua do time técnico e entrego soluções que o cliente consegue sustentar depois.

**Recomendação (trecho):** "O Tiago naturalmente puxa discussões relevantes, tanto técnicas quanto funcionais […] alguém em quem confiamos plenamente e que agrega valor em qualquer contexto em que atua." — Lilian Amélia Pereira, Sócia e Líder Técnica SAP.

## 9. Pendências de conteúdo (não bloqueiam o desenvolvimento)

Cada item tem um valor provisório no código e fica listado num `TODO.md`. O site pode ir ao ar sem eles, exceto os marcados com ★.

| Item | Valor provisório |
|---|---|
| ★ Confirmar e-mail e WhatsApp | `tiago.ufac@gmail.com` · `(68) 99967-6543` |
| ★ CV em PDF (PT e ES) | O botão fica oculto até o arquivo existir |
| URLs do Credly das 4 certificações | Sem o link "Verificar ↗" |
| Link do Cal.com/Calendly | O botão "Agendar" fica oculto |
| Resultados numéricos dos cases | Só desafio → entrega |
| Mais recomendações do LinkedIn | Só a da Lilian, sem carrossel |
| `inventory-system`: confirmar que é projeto próprio e publicável + README + 2–3 prints | Card sem imagem e com link para o repositório |
| Foto original em alta resolução | Avatar atual (240 px), gerado da foto enviada |
| Revisão das traduções EN/ES | Versão escrita por Claude |

## 10. Transição do código atual

- O site atual é preservado na branch `v1-antigo` antes de qualquer alteração no `master`.
- Não vão para o projeto novo: `index copy.html`, `src/assets/images/profile.png` (foto de banco de imagens), os arquivos `*:Zone.Identifier` e o Tailwind via CDN.
- Ficam aproveitados: `avatar.png`, `foto-linkedin.png` (fora do site, para uso no LinkedIn), os dados de formação e a bio original (reescrita).

## 11. Recomendações fora do site (para o projeto LinkedIn)

- Ativar a visibilidade da recomendação da Lilian, que hoje está "Desativada".
- Usar `foto-linkedin.png` como foto de perfil.
- No GitHub: fixar o `inventory-system`, arquivar ou tornar privados os projetos de estudo de 2022–2024 e criar um README de perfil.
