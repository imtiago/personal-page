# Reformulação do LinkedIn

Tudo para refazer o perfil, na ordem em que vale a pena fazer.

| Arquivo | O que é |
|---|---|
| [perfil-pt.md](perfil-pt.md) | Textos do perfil principal em português, seção por seção |
| [perfil-en.md](perfil-en.md) | Perfil secundário em inglês |
| [conteudo.md](conteudo.md) | Plano de 8 semanas de posts, 3 posts prontos e rotina de rede |
| `banner-pt.png` / `banner-en.png` | Capa do perfil (1584×396, em alta resolução) |

Para gerar os banners de novo (por exemplo, quando tiver domínio próprio): `node scripts/linkedin-banner.mjs`.

## Checklist (na ordem)

**Dica:** antes de começar, desative o aviso de alterações em **Configurações → Visibilidade → Compartilhar atualizações do perfil** → *Não*. Assim a sua rede não recebe 20 notificações. Reative depois, quando for postar o primeiro post.

### Privacidade e contato
- [ ] **Dados de contato:** remover o **endereço residencial** (Rua Alvorada…). Deixe só e-mail e, se quiser, o telefone.
- [ ] **Site:** trocar `imtiago.github.io/personal-page` por `https://personal-page-steel-three.vercel.app` (tipo: *Portfólio*).
- [ ] **URL personalizada:** **Perfil público e URL** (canto direito) → editar a URL para `tiago-oliveira-sap` (ou `tiagooliveira-sap`, se estiver ocupada).
  - Depois, me peça para atualizar o link do LinkedIn no site (`src/content/profile.ts`).

### Topo do perfil
- [ ] **Foto:** usar `extras/foto-linkedin.png` (a mesma do site).
- [ ] **Capa:** subir `banner-pt.png`.
- [ ] **Título:** copiar de `perfil-pt.md`.
- [ ] **"Intechpro Brasil e mais empresa":** há outra experiência marcada como *atual* que não aparece no PDF. Abra a seção Experiência no modo de edição e veja qual é: se terminou, coloque a data de término; se não deve aparecer, exclua.
- [ ] **Verificação:** fazer a verificação de identidade ("Faça a verificação em 2 minutos"). O selo aumenta a confiança dos recrutadores.
- [ ] **Disponível para → Procurando emprego:** cargos *Consultor SAP FSM*, *Consultor SAP BTP*, *Consultor SAP*; modalidade remoto; visibilidade **somente recrutadores** (assim a moldura verde #OpenToWork não aparece para a Intechpro).

### Conteúdo
- [ ] **Sobre** + 5 principais competências.
- [ ] **Experiência na Intechpro** reescrita.
- [ ] **Freelance:** juntar as duas entradas em uma.
- [ ] **Experiências antigas** encurtadas (InCicle, SEPLAG, PIBIC, UP Technology).
- [ ] **Certificações:** adicionar Fiori, FSM e Build, com link do Credly.
- [ ] **Hack2Build** movido para *Prêmios e reconhecimentos*.
- [ ] **Competências:** adicionar a lista e tirar C++/HTML5/CSS do topo.
- [ ] **Idiomas.**
- [ ] **Formação:** corrigir os campos de estudo.
- [ ] **Destaques:** site (e depois o GitHub e o primeiro post).
- [ ] **Recomendações:** ativar a da Lilian (**Recomendações → Recebidas →** ícone de lápis **→ Mostrar no perfil**).

### Perfil em inglês
- [ ] Criar o perfil secundário em inglês com `perfil-en.md`.

### Depois que o perfil estiver pronto
- [ ] Reativar "Compartilhar atualizações do perfil" e publicar o **Post 1** de `conteudo.md`.
- [ ] Começar a rotina de rede (15 convites por semana e 15 minutos por dia comentando).
