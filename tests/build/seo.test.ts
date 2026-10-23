import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { HTML_LANG, LANGS, pathFor } from '../../src/i18n/langs';
import { loadPage, readDist } from './helpers';

const SITE = 'https://personal-page-steel-three.vercel.app';

describe.each(LANGS)('SEO (%s)', (lang) => {
  const doc = loadPage(lang);
  const head = doc.head;

  it('declara o lang correto no <html>', () => {
    expect(doc.documentElement.getAttribute('lang')).toBe(HTML_LANG[lang]);
  });

  it('tem title com nome e SAP', () => {
    const title = doc.querySelector('title')?.textContent ?? '';
    expect(title).toContain('Tiago Oliveira');
    expect(title).toContain('SAP');
  });

  it('tem hreflang para os 3 idiomas + x-default, com URLs absolutas', () => {
    const alt = Object.fromEntries(
      [...head.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => [
        l.getAttribute('hreflang'),
        l.getAttribute('href'),
      ]),
    );
    expect(alt).toEqual({
      'pt-BR': `${SITE}/`,
      en: `${SITE}/en/`,
      es: `${SITE}/es/`,
      'x-default': `${SITE}/`,
    });
  });

  it('tem canonical da própria página', () => {
    expect(head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(SITE + pathFor(lang));
  });

  it('tem og:image por idioma e og:locale', () => {
    expect(head.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(`${SITE}/og/${lang}.png`);
    expect(head.querySelector('meta[property="og:locale"]')?.getAttribute('content')).toBeTruthy();
  });

  it('tem JSON-LD Person com cargo SAP, BTP e perfis', () => {
    const raw = head.querySelector('script[type="application/ld+json"]')?.textContent ?? '{}';
    const ld = JSON.parse(raw);
    expect(ld['@type']).toBe('Person');
    expect(ld.jobTitle).toContain('SAP');
    expect(ld.knowsAbout).toContain('SAP BTP');
    expect(ld.sameAs).toEqual(
      expect.arrayContaining([
        'https://www.linkedin.com/in/tiago-oliveira-sap/',
        'https://github.com/imtiago',
      ]),
    );
  });

  it('adiciona a classe js no <html> antes do CSS e tem link de pular conteúdo', () => {
    const firstScript = head.querySelector('script:not([type])');
    expect(firstScript?.textContent).toContain("classList.add('js')");
    expect(doc.querySelector('a[href="#conteudo"]')).not.toBeNull();
    expect(doc.getElementById('conteudo')).not.toBeNull();
  });
});

describe('sitemap', () => {
  it('existe e lista as 3 URLs', () => {
    expect(existsSync('dist/sitemap-index.xml')).toBe(true);
    const xml = readDist('sitemap-0.xml');
    for (const p of ['/', '/en/', '/es/']) expect(xml).toContain(`<loc>${SITE}${p}</loc>`);
  });
});
