# Tiago Oliveira — página pessoal

Site de apresentação (PT/EN/ES) de Tiago Oliveira, Consultor Técnico SAP FSM/SSAM e SAP BTP.
Feito com [Astro](https://astro.build) e Tailwind CSS: 100% estático, rápido e sem framework no navegador.

## Requisitos

- Node **22.23.4** ou mais novo (há um `.nvmrc`: rode `nvm use`)

## Comandos

```bash
npm install          # instala as dependências
npm run dev          # servidor de desenvolvimento em http://localhost:4321
npm run build        # gera o site em dist/
npm run preview      # serve o dist/ localmente
npm test             # testes unitários + testes do HTML gerado
npm run check        # checagem de tipos do Astro
```

## Onde editar o conteúdo

Todo o texto fica separado do layout. O build **falha** se faltar uma tradução ou se algum dado for inválido.

| O quê | Arquivo |
|---|---|
| Nome, contatos, links, disponibilidade, CV, agendamento | `src/content/profile.ts` |
| Áreas de expertise | `src/content/expertise.ts` |
| Diagrama "Como tudo se conecta" | `src/content/diagram.ts` |
| Etapas do método | `src/content/process.ts` |
| Projetos (cases e linha do tempo) | `src/content/projects.ts` |
| Certificações e cursos | `src/content/certifications.ts` |
| Recomendações | `src/content/testimonials.ts` |
| Sobre mim | `src/content/about.ts` |
| Textos de interface (menu, botões, títulos) | `src/i18n/ui/{pt,en,es}.json` |

Para desligar o selo "Disponível para novos projetos", use `available: false` em `profile.ts`.

### Adicionar o CV

1. Salve o PDF em `public/cv/tiago-oliveira-pt.pdf` (e `-es.pdf`, `-en.pdf` se houver).
2. Em `src/content/profile.ts`, preencha `cv: { pt: '/cv/tiago-oliveira-pt.pdf', es: '/cv/tiago-oliveira-es.pdf' }`.

Os botões "Baixar CV" aparecem sozinhos nos idiomas com arquivo.

### Imagens de prévia (WhatsApp / LinkedIn)

Depois de trocar o avatar ou o cargo, regenere com:

```bash
node scripts/og.mjs   # gera public/og/{pt,en,es}.png (usa o Google Chrome instalado)
```

## Verificação visual

```bash
npm run build && npx astro preview --port 4321 &
node scripts/shots.mjs --full     # screenshots em shots/ (3 idiomas × 4 larguras × JS on/off)
```

O script avisa com `OVERFLOW` se alguma largura tiver rolagem horizontal.

## Publicar na Vercel

1. Em [vercel.com](https://vercel.com), escolha **Add New → Project** e importe este repositório do GitHub.
2. Framework: **Astro** (detectado automaticamente). Não precisa mudar nada.
3. Depois do primeiro deploy, em **Analytics**, ative o **Web Analytics**.
4. Opcional: em **Settings → Domains**, adicione o seu domínio e atualize `site` em `astro.config.mjs` e a linha `Sitemap:` em `public/robots.txt`.

Cada `git push` publica uma nova versão, e cada branch ou PR ganha um link de preview.

Pendências de conteúdo: veja [TODO.md](TODO.md).
