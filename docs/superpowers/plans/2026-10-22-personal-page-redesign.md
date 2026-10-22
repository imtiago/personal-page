# Página pessoal (redesign) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o site atual por uma página estática trilíngue (PT/EN/ES) que posiciona Tiago Oliveira como Consultor Técnico SAP FSM/SSAM e SAP BTP.

**Architecture:** Astro gera 3 páginas estáticas (`/`, `/en/`, `/es/`) a partir de um único componente `HomePage` que recebe `lang`. O conteúdo vive em módulos TypeScript validados com Zod (`src/content/`), e os textos de interface em JSON por idioma (`src/i18n/ui/`). O JavaScript de cliente é mínimo e só adiciona animações e interações sobre um HTML que já é completo sem ele.

**Tech Stack:** Node 22 · Astro 7.4 · Tailwind CSS 4.3 (`@tailwindcss/vite`) · TypeScript · Zod · Vitest 5 · `@astrojs/sitemap` · `@vercel/analytics` · `@fontsource-variable/inter` e `@fontsource-variable/space-grotesk` · `lucide-static` (SVGs) · `linkedom` (testes do HTML gerado)

**Spec:** `docs/superpowers/specs/2026-10-22-personal-page-redesign-design.md`. Leia a spec inteira antes de começar. Os mockups aprovados estão em `.superpowers/brainstorm/721800-1792700460/content/` (`full-page-v3.html`, `nav-v2.html`, `diagram.html`) e são a referência visual: copie deles cores, espaçamentos e composição.

## Global Constraints

- Tema somente escuro. Tokens: `--bg #060f1f`, `--primary #3b9cff`, `--violet #8b5cf6`, `--cyan #38bdf8`, `--text #e8f1ff`, `--muted #9fb6d6`, `--ok #34d399`. Gradiente de destaque: `linear-gradient(90deg,#3b9cff,#8b5cf6 60%,#38bdf8)`.
- Fontes auto-hospedadas: Space Grotesk (títulos e números) e Inter (corpo). Nada de Google Fonts nem CDN.
- Ícones apenas em SVG (Lucide). **Nenhum emoji na UI.**
- **O menu não exibe o nome/logo "tiago.oliveira".** O seletor de idioma fica à esquerda e os links à direita.
- **"Seal Telecom" não aparece em lugar nenhum** (nenhum idioma, nenhum metadado).
- O título do contato é "Vamos tirar o seu projeto do papel?", **sem "SAP"**.
- Números do crachá: `5+` anos · `5` projetos SAP · `4` certificações.
- Idiomas: Português nativo · Inglês intermediário · Espanhol intermediário.
- Não há redirecionamento automático de idioma. Só uma sugestão discreta, com a escolha salva em `localStorage`.
- Todo o conteúdo precisa estar visível sem JavaScript e com `prefers-reduced-motion: reduce`.
- JS de cliente total < 15 KB gzip. Sem frameworks de UI no cliente (nada de React/Vue islands).
- Lighthouse mobile ≥ 95 nas 4 categorias.
- Sem rolagem horizontal em larguras ≥ 320 px.
- Itens opcionais ausentes (URL do Credly, CV, link de agendamento) **ocultam** o botão correspondente. Nunca geram link quebrado.
- Commits terminam com `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Sem JS ou com movimento reduzido:** os contadores mostram o valor final, o hero mostra "SAP FSM/SSAM" completo, o painel do diagrama mostra o bloco BTP e as seções não ficam com `opacity:0`. → Task 9 (teste do HTML e do CSS gerados) e Task 10 (screenshot sem JS).
2. **Dados opcionais ausentes:** sem `credlyUrl`, `cv[lang]` ou `scheduleUrl`, o botão some e não renderiza `href=""` nem `#`. → Tasks 6 e 7.
3. **Textos mais longos em EN/ES e larguras de 320–375 px:** o nome gigante usa `clamp()`, os chips quebram linha e não há overflow horizontal. → Task 10 (verificação de `scrollWidth` em 320 px nos 3 idiomas).
4. **Sugestão de idioma:** nunca aparece se já houver preferência salva, se o navegador já estiver no idioma da página ou fora da raiz `/`. → Task 4 (testes de `suggestLanguage`).
5. **Links de contato:** o WhatsApp usa só dígitos (`5568999676543`) e a mensagem é codificada em URL. O `mailto:` está correto. → Task 7 (testes de `whatsappUrl`).

---

## File Structure

```
astro.config.mjs            site, i18n, sitemap, tailwind (vite plugin)
vitest.config.ts            projects: unit (tests/unit) e build (tests/build)
package.json                scripts: dev, build, check, test:unit, test:build, test, shots
src/
  styles/global.css         @import tailwindcss; @theme tokens; utilitários (.glass, .grad-text, .chip, .btn-*)
  i18n/langs.ts             LANGS, Lang, DEFAULT_LANG, HTML_LANG, pathFor(), isLang()
  i18n/ui/{pt,en,es}.json   textos de interface (mesmas chaves)
  i18n/t.ts                 useTranslations(lang)
  content/schema.ts         Localized<T>, schemas Zod e tipos inferidos
  content/profile.ts        perfil, contatos, links, números, disponibilidade
  content/expertise.ts      3 áreas
  content/process.ts        4 etapas
  content/diagram.ts        4 nós do diagrama
  content/projects.ts       4 cases + 2 da linha do tempo
  content/certifications.ts 4 certificações + 8 cursos
  content/testimonials.ts   recomendações
  content/about.ts          título, parágrafos, marcos, formação, idiomas
  content/index.ts          valida tudo com os schemas e reexporta (o build falha se algo for inválido)
  lib/whatsapp.ts           whatsappUrl()
  lib/suggestLanguage.ts    suggestLanguage()
  lib/typewriter.ts         typewriterStep()
  lib/counter.ts            easeOutCubic(), counterValue()
  lib/activeSection.ts      pickActiveSection()
  scripts/                  scripts de cliente (importados via <script> nos componentes)
    nav.ts  langSuggest.ts  typewriter.ts  counters.ts  reveal.ts  spotlight.ts  diagram.ts
  layouts/Base.astro        <head>: SEO, hreflang, OG, JSON-LD, fontes, Analytics, classe .js
  components/               Nav, LanguageSwitcher, LangSuggest, Hero, ProfileCard, ClientStrip,
                            Expertise, ConnectDiagram, Process, Projects, Certifications,
                            Testimonials, About, Contact, Footer, WhatsAppButton, Icon,
                            SectionHeading, HomePage
  pages/index.astro  pages/en/index.astro  pages/es/index.astro
  assets/avatar.png         (copiado de src/assets/images/avatar.png)
public/
  favicon.svg  robots.txt  og/{pt,en,es}.png  cv/ (vazio até Tiago enviar)
scripts/
  og.mjs                    gera public/og/*.png com Chrome headless
  shots.mjs                 screenshots de QA (3 larguras × 3 idiomas × JS on/off)
tests/
  unit/*.test.ts
  build/helpers.ts          loadPage(lang) → Document (linkedom) a partir de dist/
  build/*.test.ts
TODO.md                     pendências de conteúdo (spec §9)
README.md                   como rodar, editar conteúdo e publicar
```

Vão ser **removidos** do `master`: `index.html`, `index copy.html`, `src/css/`, `src/js/`, `src/assets/icons/`, `src/assets/images/{backgorund.jpg,cover.png,profile.png,target.png,tiago-recorte.png}` e todos os `*:Zone.Identifier`. O site antigo já está preservado na branch `v1-antigo`. **Mantidos fora do build:** `src/assets/images/foto-linkedin.png`, movido para `extras/foto-linkedin.png`.

---

### Task 1: Scaffold Astro + Tailwind + Vitest e remoção do site antigo

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `src/styles/global.css`, `src/pages/index.astro` (provisório), `tests/build/helpers.ts`, `tests/build/smoke.test.ts`, `public/favicon.svg`, `public/robots.txt`
- Delete: os arquivos listados acima em "removidos"
- Move: `src/assets/images/avatar.png` → `src/assets/avatar.png`; `src/assets/images/foto-linkedin.png` → `extras/foto-linkedin.png`
- Modify: `.gitignore` (adicionar `node_modules/`, `dist/`, `.astro/`, `.vercel/`, `shots/`, `*:Zone.Identifier`)

**Interfaces:**
- Produces: `loadPage(lang: 'pt'|'en'|'es'): Document` em `tests/build/helpers.ts`, que lê `dist/index.html`, `dist/en/index.html` ou `dist/es/index.html` e faz o parse com `linkedom`'s `parseHTML`. Também produz `readDist(path: string): string`. Scripts npm: `build`, `check` (`astro check`), `test:unit` (`vitest run --project unit`), `test:build` (`astro build && vitest run --project build`) e `test` (os dois).
- Produces: classes CSS em `global.css`: `.glass`, `.grad-text`, `.chip`, `.chip-hl`, `.btn-primary`, `.btn-ghost`, `.grid-bg`, `.section`, além dos tokens do Global Constraints como `@theme` (`--color-bg`, `--color-primary`, `--color-violet`, `--color-cyan`, `--color-text`, `--color-muted`, `--color-ok`, `--font-display: 'Space Grotesk Variable'`, `--font-sans: 'Inter Variable'`).

- [ ] **Step 1:** Instale `astro@7.4.2`, `tailwindcss@4.3.3`, `@tailwindcss/vite@4.3.3`, `@astrojs/sitemap@3.7.4`, `@astrojs/check`, `typescript`, `zod`, `@vercel/analytics@2.0.1`, `@fontsource-variable/inter`, `@fontsource-variable/space-grotesk` e `lucide-static`. Em dev, instale `vitest@5.0.5` e `linkedom`. Configure o `astro.config.mjs` com `site: 'https://tiago-oliveira.vercel.app'` (provisório; será trocado pelo domínio), `trailingSlash: 'always'`, `build.format: 'directory'` e o plugin Vite do Tailwind.
- [ ] **Step 2: Escreva o teste que falha.** Em `tests/build/smoke.test.ts`: `loadPage('pt')` tem `document.documentElement.getAttribute('lang') === 'pt-BR'` e o CSS gerado em `dist/_astro/*.css` contém `#060f1f`.
- [ ] **Step 3:** Rode `npm run test:build`. Esperado: FAIL (página provisória sem `lang`/tokens).
- [ ] **Step 4:** Implemente o `global.css` com os tokens e as classes acima (valores visuais copiados do mockup `full-page-v3.html`) e uma página `index.astro` provisória com `<html lang="pt-BR">` que importa o `global.css`.
- [ ] **Step 5:** Rode `npm run test:build && npm run check`. Esperado: PASS e 0 erros.
- [ ] **Step 6:** Remova e mova os arquivos e atualize o `.gitignore`. Verifique com `git status` que nenhum `Zone.Identifier` está rastreado.
- [ ] **Step 7:** Commit `feat: scaffold Astro + Tailwind + Vitest; remove site antigo`.

---

### Task 2: i18n e modelo de conteúdo validado

**Files:**
- Create: `src/i18n/langs.ts`, `src/i18n/t.ts`, `src/i18n/ui/{pt,en,es}.json`, `src/content/schema.ts`, `src/content/{profile,expertise,process,diagram,projects,certifications,testimonials,about,index}.ts`
- Test: `tests/unit/i18n.test.ts`, `tests/unit/content.test.ts`

**Interfaces:**
- Produces (`langs.ts`): `LANGS = ['pt','en','es'] as const`, `type Lang`, `DEFAULT_LANG: Lang = 'pt'`, `HTML_LANG: Record<Lang,string> = {pt:'pt-BR', en:'en', es:'es'}`, `pathFor(lang: Lang): string` (retorna `'/'`, `'/en/'` ou `'/es/'`) e `isLang(x: unknown): x is Lang`.
- Produces (`t.ts`): `useTranslations(lang: Lang): (key: UiKey) => string`, com `type UiKey = keyof typeof import('./ui/pt.json')`.
- Produces (`schema.ts`): `type Localized<T> = Record<Lang, T>`, `localized(schema)` (helper Zod que exige as 3 chaves) e schemas e tipos `Profile`, `ExpertiseArea`, `ProcessStep`, `DiagramNode`, `Project`, `Certification`, `Course`, `Testimonial`, `About`. Campos mínimos:
  - `Profile`: `name`, `role: Localized<string>`, `location: Localized<string>`, `available: boolean`, `stats: {years:'5+', sapProjects:5, certs:4}`, `email`, `whatsapp` (só dígitos, com DDI), `linkedin`, `github`, `scheduleUrl?: string`, `cv: Partial<Record<Lang,string>>` e `heroSpecialties: string[]` (`['SAP FSM','SAP SSAM']`: palavras que alternam no primeiro destaque do hero; o segundo destaque, "SAP BTP", é fixo).
  - `Project`: `id`, `client`, `period: Localized<string>`, `kind: 'sap'|'dev'`, `featured: boolean`, `tags: string[]`, `challenge: Localized<string>`, `delivery: Localized<string>`, `result?: Localized<string>`, `repoUrl?: string`.
  - `Certification`: `title`, `level: Localized<string>`, `credlyUrl?: string`.
  - `Testimonial`: `author`, `role: Localized<string>`, `relation: Localized<string>`, `quote: string` (original em PT), `quoteTranslation: Partial<Record<Lang,string>>` (EN e ES) e `highlight: string` (trecho exibido com gradiente).
  - `DiagramNode`: `id: 'erp'|'btp'|'fsm'|'field'`, `badge` ('ERP'|'BTP'|'FSM'|'APP'), `title`, `subtitle: Localized<string>`, `bullets: Localized<string[]>`, `core?: boolean` (só o `btp`).
- Produces (`content/index.ts`): `profile`, `expertise`, `processSteps`, `diagramNodes`, `projects`, `certifications`, `courses`, `testimonials` e `about`, todos já parseados com `schema.parse(...)` (o parse roda no import, então dado inválido derruba o build).

- [ ] **Step 1: Escreva os testes que falham.**
  - `i18n.test.ts`: `pathFor('pt') === '/'`, `pathFor('en') === '/en/'`; `isLang('es') === true`, `isLang('fr') === false`; os 3 JSON de UI têm **exatamente** o mesmo conjunto de chaves e nenhum valor vazio.
  - `content.test.ts`:
    - `projects.filter(p => p.kind==='sap').length === 5`;
    - os cases em destaque, em ordem, são `['minasligas','pluz','armac','inventory-system']`;
    - a linha do tempo tem `['norte-energia','wps']`;
    - `JSON.stringify(allContent)` não casa com `/seal/i`;
    - `certifications.length === 4` e `courses.length === 8`;
    - `profile.stats` igual a `{years:'5+', sapProjects:5, certs:4}`;
    - `about.languages` em PT igual a `['Português — nativo','Inglês — intermediário','Espanhol — intermediário']`;
    - `localized(z.string()).safeParse({pt:'a', en:'b'}).success === false`.
- [ ] **Step 2:** Rode `npm run test:unit`. Esperado: FAIL (módulos inexistentes).
- [ ] **Step 3:** Implemente `langs.ts`, `t.ts` e `schema.ts`.
- [ ] **Step 4:** Preencha os dados. As fontes de conteúdo são a spec (§3, §8) e os currículos resumidos abaixo. Escreva EN e ES com o mesmo tom do PT.
  - Minasligas (2026, SSAM): configuração SSAM, regras de negócio, Dynamic Forms, testes, go-live.
  - Pluz (mai/2025–jan/2026, FSM): configuração FSM, regras, conector Proaxia, testes, go-live.
  - Armac (jun/2024–abr/2025, FSM): configuração FSM, regras, conector Proaxia, go-live, melhorias pós-implantação.
  - Norte Energia (jan–jun/2024): curso de regras de negócio FSM, consultas avançadas, configuração e suporte.
  - WPS (2023, FSM com integração): líder de integração técnica, desenvolvedor Fiori, regras de negócio.
  - inventory-system (`kind:'dev'`, `repoUrl: 'https://github.com/imtiago/inventory-system'`): "Sistema de Gestão Comercial e Estoque", ERP enxuto com compras, vendas, financeiro, estoque e importação de NF-e (XML/PDF); tags `Node`, `TypeScript`, `React`, `Prisma`, `Clean Architecture`.
  - Certificações: SAP Certified Associate – SAP Fiori Application Developer; SAP Certified – SAP Field Service Management; SAP Certified – SAP Build Developer; SAP Certified – SAP Business Data Cloud (todas sem `credlyUrl` por enquanto).
  - Cursos: Cloud Connector; SAP Build Apps; Cloud Identity Services; Discovering SAP BTP; SAP Analytics Cloud; Developing SAPUI5 Applications; SAP Build no-code; Clean Core for S/4HANA Cloud.
  - Contatos: `email:'tiago.ufac@gmail.com'`, `whatsapp:'5568999676543'`, `linkedin:'https://www.linkedin.com/in/tiago-oliveira-852a27201/'`, `github:'https://github.com/imtiago'`, sem `scheduleUrl` e com `cv: {}`.
  - Expertise, processo, diagrama e textos do Sobre: copie do mockup `full-page-v3.html`/`diagram.html` e da spec §8.
- [ ] **Step 5:** Rode `npm run test:unit && npm run check`. Esperado: PASS.
- [ ] **Step 6:** Commit `feat: i18n e modelo de conteúdo validado com Zod`.

---

### Task 3: Layout base, páginas por idioma e SEO

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/HomePage.astro` (por ora só `<main>` com um `<h1>` sr-only), `src/pages/en/index.astro`, `src/pages/es/index.astro`
- Modify: `src/pages/index.astro`, `astro.config.mjs` (sitemap com `i18n: {defaultLocale:'pt', locales:{pt:'pt-BR', en:'en', es:'es'}}`)
- Test: `tests/build/seo.test.ts`

**Interfaces:**
- Consumes: `LANGS`, `HTML_LANG`, `pathFor`, `useTranslations` e `profile` (Task 2).
- Produces: `<Base lang={lang}>` com slot. Cada `pages/**/index.astro` é apenas `<Base lang="xx"><HomePage lang="xx" /></Base>`. O `Base` adiciona, inline e no `<head>`, `document.documentElement.classList.add('js')` antes de qualquer CSS. As tasks seguintes usam `.js` como gate de animações.
- Chaves de UI: `meta.title`, `meta.description` e `meta.ogAlt`.

- [ ] **Step 1: Escreva os testes que falham** (`seo.test.ts`, para cada `lang`):
  - `<html lang>` é igual a `HTML_LANG[lang]`;
  - o `<title>` contém "Tiago Oliveira" e "SAP";
  - há `link[rel=alternate][hreflang]` para `pt-BR`, `en`, `es` e `x-default` (este aponta para `/`), com URLs absolutas;
  - `link[rel=canonical]` é igual a `site + pathFor(lang)`;
  - `meta[property="og:image"]` termina em `/og/${lang}.png` e `og:locale` está presente;
  - existe um `script[type="application/ld+json"]` que, parseado, tem `@type === 'Person'`, `jobTitle` contendo "SAP", `knowsAbout` incluindo `'SAP BTP'` e `sameAs` com as URLs do LinkedIn e do GitHub;
  - `dist/sitemap-index.xml` existe e o sitemap lista as 3 URLs.
- [ ] **Step 2:** Rode `npm run test:build`. Esperado: FAIL.
- [ ] **Step 3:** Implemente o `Base.astro`: meta tags, fontes (`import '@fontsource-variable/inter'` e `'@fontsource-variable/space-grotesk'`), `global.css`, `<Analytics />` de `@vercel/analytics/astro`, JSON-LD gerado a partir de `profile`, `body` com `bg-bg text-text font-sans` e o link "Pular para o conteúdo" (chave `a11y.skip`), apontando para `#conteudo`.
- [ ] **Step 4:** Rode `npm run test:build`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: layout base, páginas PT/EN/ES e SEO`.

---

### Task 4: Menu, seletor de idioma e sugestão de idioma

**Files:**
- Create: `src/components/Nav.astro`, `src/components/LanguageSwitcher.astro`, `src/components/LangSuggest.astro`, `src/components/Icon.astro`, `src/lib/suggestLanguage.ts`, `src/lib/activeSection.ts`, `src/scripts/nav.ts`, `src/scripts/langSuggest.ts`
- Modify: `src/components/HomePage.astro`
- Test: `tests/unit/suggestLanguage.test.ts`, `tests/unit/activeSection.test.ts`, `tests/build/nav.test.ts`

**Interfaces:**
- Produces: `Icon.astro` com props `{ name: string; size?: number; class?: string }`, que faz inline do SVG de `lucide-static/icons/${name}.svg` com `aria-hidden="true"`.
- Produces: `suggestLanguage(input: { browserLangs: readonly string[]; current: Lang; stored: Lang | null; pathname: string }): Lang | null`. Regras:
  - retorna `null` se `stored` existir, se `pathname !== '/'` ou se o primeiro idioma do navegador que casar com `LANGS` (comparando só o prefixo, ex.: `es-AR` → `es`) for igual a `current`;
  - caso contrário, retorna esse idioma;
  - se nenhum idioma casar, retorna `null`.
- Produces: `pickActiveSection(sections: {id: string; top: number}[], scrollY: number, offset: number): string | null`, que retorna o `id` da última seção com `top <= scrollY + offset`, ou `null`.
- IDs das seções (usados por todas as tasks seguintes): `inicio`, `expertise`, `arquitetura`, `metodo`, `projetos`, `certificacoes`, `recomendacoes`, `sobre`, `contato`. São os mesmos em todos os idiomas.
- Chaves de UI: `nav.expertise`, `nav.projects`, `nav.certs`, `nav.about`, `nav.contact`, `nav.menu`, `nav.close`, `lang.label`, `lang.suggest` (ex.: "Ver esta página em português?"; uma frase por idioma, **escrita no idioma sugerido**), `lang.suggestYes` e `lang.suggestNo`.

- [ ] **Step 1: Escreva os testes que falham.**
  - `suggestLanguage`:
    - `{browserLangs:['es-AR','en'], current:'pt', stored:null, pathname:'/'}` → `'es'`;
    - o mesmo com `stored:'pt'` → `null`;
    - o mesmo com `pathname:'/en/'` → `null`;
    - `{browserLangs:['pt-BR'], current:'pt', ...}` → `null`;
    - `{browserLangs:['fr-FR','de'], ...}` → `null`;
    - `{browserLangs:['fr','en-US'], current:'pt', stored:null, pathname:'/'}` → `'en'`.
  - `pickActiveSection`: com seções `[{id:'a',top:0},{id:'b',top:800},{id:'c',top:1600}]` e offset 100: scrollY 0 → `'a'`, 750 → `'b'`, 5000 → `'c'`; com seções `[{id:'a',top:500}]` e scrollY 0 → `null`.
  - `nav.test.ts` (cada `lang`):
    - o `<header>` não contém o texto `tiago.oliveira` nem `Tiago Oliveira`;
    - o primeiro elemento interativo dentro do `<nav>` pertence ao seletor de idioma;
    - o seletor tem 3 links com `href` igual a `pathFor(l)`, atributo `lang` próprio e `aria-current="page"` somente no idioma atual;
    - os links de seção apontam para `#expertise`, `#projetos`, `#certificacoes`, `#sobre` e `#contato`;
    - o botão do menu mobile tem `aria-expanded="false"` e `aria-controls`.
- [ ] **Step 2:** Rode `npm run test:unit && npm run test:build`. Esperado: FAIL.
- [ ] **Step 3:** Implemente as funções puras, depois os componentes (visual do `nav-v2.html`: pílula com globo, idioma ativo com gradiente) e os scripts.
  - `nav.ts`: header fixo que ganha `.glass` após 24 px de rolagem; barra de progresso (`scaleX`) no topo; seção ativa via `pickActiveSection`, aplicando `aria-current="true"` no link; toggle do menu mobile (≤ 768 px), que fecha com Esc e ao clicar num link.
  - `langSuggest.ts`: lê `navigator.languages` e `localStorage['lang']` dentro de `try/catch`; se `suggestLanguage` retornar algo, mostra o toast. "Sim" salva e navega; "Não" salva `current`. Clicar no seletor também salva.
- [ ] **Step 4:** Rode os testes. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: menu, seletor e sugestão de idioma`.

---

### Task 5: Hero, crachá e faixa de clientes

**Files:**
- Create: `src/components/Hero.astro`, `src/components/ProfileCard.astro`, `src/components/ClientStrip.astro`, `src/lib/typewriter.ts`, `src/lib/counter.ts`, `src/scripts/typewriter.ts`, `src/scripts/counters.ts`
- Modify: `src/components/HomePage.astro`
- Test: `tests/unit/typewriter.test.ts`, `tests/unit/counter.test.ts`, `tests/build/hero.test.ts`

**Interfaces:**
- Produces: `typewriterStep(state: {word: number; chars: number; deleting: boolean}, words: readonly string[]): {word: number; chars: number; deleting: boolean; pauseMs: number}`.
  - Digitando, incrementa `chars`. Ao completar a palavra, passa `deleting=true` com `pauseMs=1600`.
  - Apagando, decrementa `chars`. Ao chegar a 0, avança `word` (de forma circular) com `deleting=false` e `pauseMs=300`.
  - Nos demais passos, `pauseMs` é 70 digitando e 35 apagando.
- Produces: `easeOutCubic(t: number): number` e `counterValue(target: number, t: number): number` (`Math.round(target * easeOutCubic(clamp(t,0,1)))`).
- Chaves de UI: `hero.status`, `hero.hello`, `hero.lead` (com o marcador `{specialty}`), `hero.leadBtp`, `hero.cta`, `hero.cv`, `card.years`, `card.projects`, `card.certs` e `clients.label`.

- [ ] **Step 1: Escreva os testes que falham.**
  - `typewriterStep` com `words=['ab','c']`:
    - de `{0,0,false}` → `chars 1`, `pauseMs 70`;
    - de `{0,2,false}` → `deleting true`, `pauseMs 1600`;
    - de `{0,1,true}` → `chars 0`, `pauseMs 35`;
    - de `{0,0,true}` → `word 1`, `deleting false`, `pauseMs 300`;
    - de `{1,0,true}` → `word 0`.
  - `counterValue(5, 0) === 0`, `counterValue(5, 1) === 5`, `counterValue(5, 2) === 5` e `counterValue(4, 0.5) === 4` (porque `easeOutCubic(.5) = .875`, e 3,5 arredonda para 4).
  - `hero.test.ts` (cada `lang`):
    - `#inicio h1` contém "Tiago" e "Oliveira", e "Oliveira" está num elemento com a classe `grad-text`;
    - o elemento `[data-typewriter]` tem como **texto inicial** `SAP FSM/SSAM` (o HTML sem JS mostra as duas especialidades) e o atributo `data-words` igual a `["SAP FSM","SAP SSAM"]`; o texto "SAP BTP" aparece fixo no mesmo parágrafo;
    - os contadores `[data-count]` têm como texto inicial `5+`, `5` e `4`;
    - o avatar é um `<img>` com `alt` não vazio, `width`/`height` definidos e `src` em `/_astro/` (otimizado);
    - a faixa de clientes contém, em ordem, MINASLIGAS, PLUZ, ARMAC, NORTE ENERGIA e WPS;
    - o botão "Baixar CV" **não existe** enquanto `profile.cv[lang]` estiver vazio;
    - o status "disponível" só renderiza se `profile.available`.
- [ ] **Step 2:** Rode os testes. Esperado: FAIL.
- [ ] **Step 3:** Implemente seguindo o hero do `full-page-v3.html`. O nome usa `font-size: clamp(3.25rem, 9vw, 5.5rem)`. O fundo tem grid e aurora (pseudo-elemento com `@keyframes` lento de 30 s, ativo só sob `.js` e `prefers-reduced-motion: no-preference`). O avatar usa `<Image>` do `astro:assets`. O crachá fica à direita no desktop e abaixo do texto em telas < 900 px.
  - `typewriter.ts`: só roda se `matchMedia('(prefers-reduced-motion: no-preference)')` e usa `aria-live="off"`. O texto completo fica num `<span class="sr-only">` estável.
  - `counters.ts`: anima de 0 até o valor ao entrar na viewport (IntersectionObserver, 1,2 s), preservando o sufixo `+`.
- [ ] **Step 4:** Rode os testes. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: hero com crachá, typewriter, contadores e faixa de clientes`.

---

### Task 6: Seções Expertise, Arquitetura (diagrama), Método e Projetos

**Files:**
- Create: `src/components/SectionHeading.astro`, `src/components/Expertise.astro`, `src/components/ConnectDiagram.astro`, `src/components/Process.astro`, `src/components/Projects.astro`, `src/scripts/diagram.ts`, `src/scripts/spotlight.ts`
- Modify: `src/components/HomePage.astro`
- Test: `tests/build/sections.test.ts`

**Interfaces:**
- Produces: `SectionHeading.astro` com props `{ id: string; eyebrow: string; title: string; highlight: string; sub?: string }`. Renderiza um `<h2>` em que a palavra `highlight` recebe `.grad-text`.
- Ícones (Lucide) das áreas: `wrench` (FSM/SSAM), `cloud` (BTP) e `code-2` (Dev).
- Chaves de UI: `expertise.*`, `arch.*`, `process.*`, `projects.*` (incluindo `projects.challenge`, `projects.delivery`, `projects.result`, `projects.repo` e `projects.devTag`).

- [ ] **Step 1: Escreva os testes que falham** (`sections.test.ts`, cada `lang`):
  - a ordem dos `section[id]` dentro de `main` é `inicio, expertise, arquitetura, metodo, projetos, certificacoes, recomendacoes, sobre, contato` (as 3 últimas podem estar como placeholders vazios por enquanto);
  - `#expertise` tem 3 cartões `[data-card]`, e o primeiro título contém "FSM" e o segundo "BTP";
  - `#arquitetura` tem 4 `button[data-node]` na ordem `erp, btp, fsm, field`, com `aria-controls` apontando para um painel `[role=region]`;
  - **sem JS**, o painel já mostra o conteúdo do nó `btp` e esse botão tem `aria-pressed="true"`;
  - existe um texto alternativo do diagrama (`.sr-only` com a descrição do fluxo);
  - `#metodo` tem 4 etapas, numeradas de `01` a `04`;
  - `#projetos` tem 4 `article[data-featured]` na ordem Minasligas, Pluz, Armac e o case de desenvolvimento; o case dev tem a etiqueta `projects.devTag` e um link para `https://github.com/imtiago/inventory-system` com `rel` contendo `noopener`;
  - a linha do tempo tem Norte Energia e WPS;
  - nenhum `article` renderiza o bloco "resultado" quando `result` não existe;
  - a página inteira não casa com `/seal/i` e não tem emojis (regex `\p{Extended_Pictographic}` com flag `u`).
- [ ] **Step 2:** Rode `npm run test:build`. Esperado: FAIL.
- [ ] **Step 3:** Implemente com o visual do `full-page-v3.html` (Expertise, Método, Projetos) e do `diagram.html` (Arquitetura).
  - Diagrama: grid horizontal ≥ 900 px e coluna vertical abaixo disso; fios em CSS com pontos animados só sob `.js` e sem reduced-motion.
  - `diagram.ts`: hover, focus ou clique num nó troca o painel e o `aria-pressed`. O conteúdo dos 4 painéis está todo no HTML; só um fica visível por vez com `hidden`, e o do BTP é o padrão sem JS.
  - `spotlight.ts`: no `pointermove` sobre `[data-card]`, define `--mx/--my` para um `radial-gradient` no `::before`. Fica desativado em `pointer: coarse`.
- [ ] **Step 4:** Rode os testes. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: seções expertise, diagrama de arquitetura, método e projetos`.

---

### Task 7: Certificações, Recomendações, Sobre, Contato, Rodapé e WhatsApp

**Files:**
- Create: `src/components/Certifications.astro`, `src/components/Testimonials.astro`, `src/components/About.astro`, `src/components/Contact.astro`, `src/components/Footer.astro`, `src/components/WhatsAppButton.astro`, `src/lib/whatsapp.ts`
- Modify: `src/components/HomePage.astro`
- Test: `tests/unit/whatsapp.test.ts`, `tests/build/contact.test.ts`

**Interfaces:**
- Produces: `whatsappUrl(phoneDigits: string, message: string): string`, que retorna `https://wa.me/${digits}?text=${encodeURIComponent(message)}`. Lança `Error` se `phoneDigits` tiver algo além de dígitos ou menos de 10 dígitos.
- Chaves de UI: `certs.*` (incluindo `certs.verify` e `certs.courses`), `testimonials.*` (incluindo `testimonials.translation`), `about.*`, `contact.title`, `contact.highlight`, `contact.whatsapp`, `contact.email`, `contact.linkedin`, `contact.schedule`, `contact.cv`, `contact.waMessage` e `footer.*`.

- [ ] **Step 1: Escreva os testes que falham.**
  - `whatsappUrl('5568999676543','Olá, Tiago!') === 'https://wa.me/5568999676543?text=Ol%C3%A1%2C%20Tiago!'`; `whatsappUrl('+55 68 9…','x')` lança erro; `whatsappUrl('123','x')` lança erro.
  - `contact.test.ts` (cada `lang`):
    - `#certificacoes` tem 4 cartões e **nenhum** link "Verificar" (sem `credlyUrl`); a lista de cursos tem 8 itens;
    - `#recomendacoes` tem `blockquote` com o texto original em PT, com `lang="pt-BR"`, e o autor "Lilian Amélia Pereira"; em EN e ES aparece também a tradução, marcada com o texto de `testimonials.translation`; **não há** controles de carrossel com 1 recomendação;
    - `#sobre` tem o `<h2>` com "campo" (PT), "field" (EN) ou "terreno" (ES), em `.grad-text`; tem 3 parágrafos; o PT bate literalmente com a spec §8; a linha do tempo tem 4 marcos (2012, 2019, 2021 e "Hoje"/"Today"/"Hoy"); a formação cita UFAC e IFAC; há 3 idiomas;
    - em `#contato`, o `<h2>` em PT tem o texto (normalizando espaços) **exatamente** "Vamos tirar o seu projeto do papel?" e não contém "SAP";
    - o link de WhatsApp começa com `https://wa.me/5568999676543?text=`; o e-mail é `mailto:tiago.ufac@gmail.com`; o LinkedIn tem `target="_blank"` e `rel` com `noopener`;
    - **não existem** os botões "Agendar" e "Baixar CV" (dados ausentes) e nenhum `a[href=""]` nem `a[href="#"]` na página;
    - o botão flutuante do WhatsApp existe com `aria-label`;
    - o rodapé tem o ano corrente e os links do GitHub e do LinkedIn.
- [ ] **Step 2:** Rode os testes. Esperado: FAIL.
- [ ] **Step 3:** Implemente com o visual do `full-page-v3.html`. Selos das certificações em SVG, com gradiente azul e o texto "SAP". Recomendações: com 1 item, mostra a citação centralizada; com mais de 1, mostra uma faixa horizontal com `scroll-snap` (sem JS) e indicadores. Não use biblioteca de carrossel. O ícone do WhatsApp vem de um SVG próprio em `src/assets/icons/whatsapp.svg`, porque o Lucide não tem logo de marca; idem para LinkedIn e GitHub, se o `lucide-static` não os tiver.
- [ ] **Step 4:** Rode `npm test`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: certificações, recomendações, sobre, contato e rodapé`.

---

### Task 8: Revelação ao rolar e checagem do orçamento de JS

**Files:**
- Create: `src/scripts/reveal.ts`
- Modify: `src/styles/global.css`, `src/components/HomePage.astro` (atributos `data-reveal`)
- Test: `tests/build/progressive.test.ts`

**Interfaces:**
- Consumes: a classe `.js` no `<html>` (Task 3).

- [ ] **Step 1: Escreva os testes que falham** (`progressive.test.ts`):
  - em todo o CSS de `dist/_astro/*.css`, qualquer regra que defina `opacity:0` para `[data-reveal]` está sob o seletor `.js` **e** dentro de `@media (prefers-reduced-motion: no-preference)`. Verifique com regex sobre o CSS minificado: nenhuma ocorrência de `[data-reveal]` com `opacity:0` fora desse contexto;
  - as animações da aurora e dos fios do diagrama (`@keyframes`) só são referenciadas dentro de `prefers-reduced-motion: no-preference`;
  - a soma do gzip de todos os `dist/_astro/*.js` é menor que 15 360 bytes (use `zlib.gzipSync`).
- [ ] **Step 2:** Rode `npm run test:build`. Esperado: FAIL (o `data-reveal` ainda não existe, então o primeiro teste deve exigir pelo menos um `[data-reveal]` no HTML).
- [ ] **Step 3:** Implemente `reveal.ts` (IntersectionObserver que adiciona `.is-visible` uma única vez) e as regras de CSS, aplicando `data-reveal` nos cartões e títulos de seção.
- [ ] **Step 4:** Rode `npm test`. Esperado: PASS.
- [ ] **Step 5:** Commit `feat: revelação ao rolar com fallback sem JS e movimento reduzido`.

---

### Task 9: Imagens de prévia (OG), favicon, TODO e README

**Files:**
- Create: `scripts/og.mjs`, `scripts/og-template.html`, `public/og/{pt,en,es}.png`, `public/favicon.svg` (substituir o provisório), `TODO.md`, `README.md`
- Test: `tests/unit/og.test.ts`

**Interfaces:**
- Consumes: `extras/`, `src/assets/avatar.png` e os textos `meta.title` e `profile.role`.

- [ ] **Step 1: Escreva o teste que falha** (`og.test.ts`): para cada `lang`, `public/og/${lang}.png` existe, e a leitura do cabeçalho IHDR do PNG (bytes 16–23) dá largura 1200 e altura 630.
- [ ] **Step 2:** Rode `npm run test:unit`. Esperado: FAIL.
- [ ] **Step 3:** Implemente `og.mjs`. Ele renderiza `og-template.html` (fundo do site, avatar com anel em gradiente, "Tiago Oliveira" e "Consultor SAP FSM · SSAM · BTP" traduzido) com `google-chrome --headless=new --screenshot --window-size=1200,630 --hide-scrollbars --force-device-scale-factor=1`. **Atenção:** neste ambiente o Chrome headless já cortou a parte de baixo de viewports pequenas. Renderize com `--window-size=1200,800`, posicione o card em `top:0` e recorte para 1200×630 decodificando o PNG (inflate e filtros) e re-codificando com `zlib`, sem dependências novas. Confira visualmente abrindo o PNG. O favicon é um "TO" em Space Grotesk com o gradiente, em SVG.
- [ ] **Step 4:** Escreva o `TODO.md` com a tabela da spec §9 (o que falta, onde editar: arquivo e campo, e o que acontece quando for preenchido). Escreva o `README.md` com: requisitos (Node 22), `npm i`, `npm run dev`, `npm test`, como editar conteúdo (`src/content/*`, `src/i18n/ui/*`), como adicionar o CV (`public/cv/tiago-oliveira-<lang>.pdf` + `profile.cv[lang]`), como regenerar as imagens OG (`node scripts/og.mjs`) e como publicar na Vercel (importar o repositório, framework Astro, ativar Web Analytics nas configurações do projeto, depois o domínio).
- [ ] **Step 5:** Rode `npm test`. Esperado: PASS.
- [ ] **Step 6:** Commit `feat: imagens OG, favicon, TODO de conteúdo e README`.

---

### Task 10: QA visual, responsivo e acessibilidade

**Files:**
- Create: `scripts/shots.mjs`
- Modify: o que os achados exigirem

**Interfaces:**
- Consumes: `dist/`, servido por `npx astro preview --port 4321`.

- [ ] **Step 1:** Implemente `shots.mjs`. Ele gera screenshots de página inteira de `/`, `/en/` e `/es/` em 320, 375, 768 e 1440 px, com JS ligado e desligado (`--blink-settings=scriptEnabled=false`), em `shots/` (gitignored). Para cada combinação, também roda o Chrome headless com `--dump-dom` num HTML que avalia `document.documentElement.scrollWidth <= innerWidth` (ou use `--remote-debugging` com CDP, se preferir) e imprime `OVERFLOW <lang> <width>` quando falhar.
- [ ] **Step 2:** Rode `npm run build && (npx astro preview --port 4321 &) && node scripts/shots.mjs`. Esperado: nenhuma linha `OVERFLOW`.
- [ ] **Step 3:** Abra e revise **todas** as screenshots, comparando com `full-page-v3.html`, `nav-v2.html` e `diagram.html`. Confira em JS desligado: contadores com valor final, hero com "SAP FSM/SSAM", painel BTP visível e todas as seções visíveis. Corrija o que divergir.
- [ ] **Step 4:** Verifique o contraste AA dos pares usados (`--muted #9fb6d6` sobre `#060f1f`, texto dos chips, botões com gradiente e texto branco no ponto mais claro `#38bdf8`) com um cálculo de luminância relativa (script curto ou teste unitário `tests/unit/contrast.test.ts` com a fórmula WCAG). Alvo ≥ 4,5:1 para texto normal. Ajuste os tokens se algum par falhar.
- [ ] **Step 5:** Navegue pelo teclado no preview (Tab do topo ao fim): o foco fica visível em todos os interativos, o "Pular para o conteúdo" funciona, o menu mobile abre e fecha com Enter/Esc e os nós do diagrama trocam com Enter/Espaço.
- [ ] **Step 6:** Rode o Lighthouse mobile localmente (`npx lighthouse http://localhost:4321/ --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --chrome-flags="--headless=new" --output=json --output-path=shots/lh.json`) e confira as 4 notas ≥ 95. Corrija e repita até passar.
- [ ] **Step 7:** Rode `npm test && npm run check`. Esperado: PASS e 0 erros.
- [ ] **Step 8:** Commit `chore: QA visual, responsivo, contraste e Lighthouse`.

---

## Depois do plano (com o Tiago)

Itens que dependem de contas ou decisões do Tiago e **não** fazem parte da execução automática:
- Importar o repositório na Vercel e ativar o Web Analytics.
- Registrar o domínio e trocar o `site` no `astro.config.mjs`.
- Preencher as pendências do `TODO.md`.
- Rodar a verificação 7 da spec (depurador de compartilhamento do LinkedIn e WhatsApp) já com a URL pública.
- Fazer o `git push` (só quando ele pedir).
