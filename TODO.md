# Pendências de conteúdo

O site funciona sem estes itens: cada um tem um comportamento provisório.
Os marcados com ★ são recomendados antes de divulgar o link.

| Pendência | Onde editar | Hoje (provisório) | Quando preencher |
|---|---|---|---|
| ★ Confirmar e-mail e WhatsApp | `src/content/profile.ts` → `email`, `whatsapp` (só dígitos, com 55 + DDD) | `tiago.ufac@gmail.com` · `5568999676543` | Botões de contato e botão flutuante usam os novos dados |
| ★ CV em PDF (PT e ES; EN opcional) | Salvar em `public/cv/tiago-oliveira-pt.pdf` (e `-es`, `-en`) e preencher `profile.cv` em `src/content/profile.ts`, ex.: `cv: { pt: '/cv/tiago-oliveira-pt.pdf', es: '/cv/tiago-oliveira-es.pdf' }` | Botões "Baixar CV" ocultos | Botão aparece no topo e no contato do idioma correspondente |
| Links do Credly das certificações | `src/content/certifications.ts` → `credlyUrl` de cada item | Sem link "Verificar" | Aparece "Verificar ↗" no selo |
| Link de agendamento (Cal.com / Calendly) | `src/content/profile.ts` → `scheduleUrl` | Botão "Agendar 30 min" oculto | Botão aparece no contato |
| Resultados com números dos cases | `src/content/projects.ts` → `result: { pt, en, es }` | Card mostra só desafio e entrega | Linha "Resultado" aparece no card |
| Mais recomendações do LinkedIn | `src/content/testimonials.ts` (novo item no array) | Só a da Lilian | Com 2+ vira faixa deslizante |
| `inventory-system`: confirmar que pode ser público, criar README e 2–3 prints | Repositório no GitHub | Card com link para o repositório | — |
| Foto original em alta resolução | Substituir `src/assets/avatar.png` (quadrado, rosto centralizado) e rodar `node scripts/og.mjs` | Avatar de 240 px gerado da foto enviada | Avatar e prévias de link mais nítidos |
| Revisar traduções EN/ES | `src/i18n/ui/en.json`, `es.json` e campos `en`/`es` em `src/content/*.ts` | Traduções escritas por Claude | — |
| Domínio próprio | `astro.config.mjs` → `site` e `public/robots.txt` | `https://tiago-oliveira.vercel.app` | URLs canônicas, sitemap e prévias passam a usar o domínio |
| Ativar a recomendação da Lilian no LinkedIn | LinkedIn → Recomendações → visibilidade | Desativada no perfil | Aparece no perfil público |
