import { describe, expect, it } from 'vitest';
import { LANGS } from '../../src/i18n/langs';
import { useTranslations } from '../../src/i18n/t';
import { loadPage } from './helpers';

const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();

const ABOUT_PT = [
  'Escrevi minha primeira solução aos 16 anos: um sistema de gestão para um consultório odontológico em Rio Branco (AC). Desde então, faço a mesma coisa em escalas cada vez maiores: transformar processos manuais em sistemas que funcionam.',
  'Passei pela Secretaria de Planejamento do Acre e por projetos como desenvolvedor freelancer até encontrar, em 2021, o ponto em que tecnologia e operação se encontram: o ecossistema SAP. Hoje conduzo implementações de SAP FSM, SSAM e SAP BTP de ponta a ponta, da configuração e das regras de negócio às integrações com S/4HANA, ao go-live e à capacitação das equipes.',
  'Minha base de desenvolvedor faz diferença: entendo o processo de quem está em campo, falo a língua do time técnico e entrego soluções que o cliente consegue sustentar depois.',
];

describe.each(LANGS)('certificações, recomendações, sobre e contato (%s)', (lang) => {
  const doc = loadPage(lang);
  const t = useTranslations(lang);
  const $ = (id: string) => doc.getElementById(id)!;

  it('certificações: 4 cartões, sem "Verificar" sem Credly, 8 cursos', () => {
    expect($('certificacoes').querySelectorAll('[data-cert]')).toHaveLength(4);
    expect($('certificacoes').querySelector('[data-verify]')).toBeNull();
    expect($('certificacoes').querySelectorAll('[data-courses] li')).toHaveLength(8);
  });

  it('recomendação: citação original em PT com autora', () => {
    const q = $('recomendacoes').querySelector('blockquote')!;
    expect(q.getAttribute('lang')).toBe('pt-BR');
    expect(q.textContent).toContain('confiamos plenamente');
    expect($('recomendacoes').textContent).toContain('Lilian Amélia Pereira');
  });

  it('recomendação: tradução só fora do PT, e sem carrossel com 1 item', () => {
    const tr = $('recomendacoes').querySelector('[data-translation]');
    if (lang === 'pt') expect(tr).toBeNull();
    else expect(tr?.textContent).toContain(t('testimonials.translation'));
    expect($('recomendacoes').querySelector('[data-carousel]')).toBeNull();
  });

  it('sobre: título com destaque no idioma, 3 parágrafos, 4 marcos, formação e idiomas', () => {
    const word = { pt: 'campo', en: 'field', es: 'terreno' }[lang];
    expect($('sobre').querySelector('h2 .grad-text')?.textContent).toBe(word);
    const ps = [...$('sobre').querySelectorAll('[data-about-text] p')].map((p) => norm(p.textContent));
    expect(ps).toHaveLength(3);
    if (lang === 'pt') expect(ps).toEqual(ABOUT_PT);
    const years = [...$('sobre').querySelectorAll('[data-milestone] [data-year]')].map((y) => y.textContent?.trim());
    expect(years.slice(0, 3)).toEqual(['2012', '2019', '2021']);
    expect(years[3]).toBe({ pt: 'Hoje', en: 'Today', es: 'Hoy' }[lang]);
    expect($('sobre').textContent).toContain('UFAC');
    expect($('sobre').textContent).toContain('IFAC');
    expect($('sobre').querySelectorAll('[data-languages] li')).toHaveLength(3);
  });

  it('contato: título sem SAP (PT exato)', () => {
    const h2 = norm($('contato').querySelector('h2')?.textContent);
    expect(h2).not.toContain('SAP');
    if (lang === 'pt') expect(h2).toBe('Vamos tirar o seu projeto do papel?');
  });

  it('contato: links de WhatsApp, e-mail e LinkedIn', () => {
    const c = $('contato');
    expect(c.querySelector('a[data-contact="whatsapp"]')?.getAttribute('href')).toMatch(
      /^https:\/\/wa\.me\/5568999676543\?text=/,
    );
    expect(c.querySelector('a[data-contact="email"]')?.getAttribute('href')).toBe('mailto:tiago.ufac@gmail.com');
    const li = c.querySelector('a[data-contact="linkedin"]')!;
    expect(li.getAttribute('target')).toBe('_blank');
    expect(li.getAttribute('rel')).toContain('noopener');
  });

  it('sem agendamento e sem CV: botões ausentes e nenhum link vazio', () => {
    expect(doc.querySelector('[data-contact="schedule"]')).toBeNull();
    expect(doc.querySelector('[data-contact="cv"]')).toBeNull();
    expect(doc.querySelector('a[href=""], a[href="#"]')).toBeNull();
  });

  it('botão flutuante de WhatsApp com aria-label', () => {
    const fab = doc.querySelector('a[data-whatsapp-float]')!;
    expect(fab.getAttribute('aria-label')).toBe(t('contact.waFloat'));
  });

  it('rodapé com ano atual, GitHub e LinkedIn', () => {
    const footer = doc.querySelector('footer')!;
    expect(footer.textContent).toContain(String(new Date().getFullYear()));
    expect(footer.querySelector('a[href="https://github.com/imtiago"]')).not.toBeNull();
    expect(footer.querySelector('a[href="https://www.linkedin.com/in/tiago-oliveira-sap/"]')).not.toBeNull();
  });
});
