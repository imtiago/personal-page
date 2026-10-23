import { describe, expect, it } from 'vitest';
import { LANGS } from '../../src/i18n/langs';
import { loadPage, readDist } from './helpers';

describe.each(LANGS)('correções da revisão final (%s)', (lang) => {
  const doc = loadPage(lang);

  it('a barra de progresso não usa utilitário scale-* (conflita com transform do script)', () => {
    const bar = doc.querySelector('[data-progress]')!;
    expect(bar.getAttribute('class')).not.toMatch(/\bscale-/);
  });

  it('leitores de tela ouvem o texto completo; o texto animado fica oculto para eles', () => {
    const p = doc.querySelector('[data-typewriter]')!.closest('p')!;
    expect(p.querySelector('.sr-only')?.textContent?.trim()).toBe('SAP FSM/SSAM');
    expect(p.querySelector('[data-typewriter-box]')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('o título do case de desenvolvimento está traduzido', () => {
    const title = doc.querySelector('article[data-id="inventory-system"] h3')?.textContent?.trim();
    const expected = {
      pt: 'Sistema de Gestão Comercial e Estoque',
      en: 'Sales & Inventory Management System',
      es: 'Sistema de Gestión Comercial e Inventario',
    }[lang];
    expect(title).toBe(expected);
  });

  it('pré-carrega as fontes latinas de títulos e corpo', () => {
    const preloads = [...doc.head.querySelectorAll('link[rel="preload"][as="font"]')];
    const hrefs = preloads.map((l) => l.getAttribute('href') ?? '');
    expect(hrefs.some((h) => /space-grotesk-latin-wght-normal.*\.woff2$/.test(h))).toBe(true);
    expect(hrefs.some((h) => /inter-latin-wght-normal.*\.woff2$/.test(h))).toBe(true);
    for (const l of preloads) {
      expect(l.getAttribute('type')).toBe('font/woff2');
      expect(l.hasAttribute('crossorigin')).toBe(true);
      expect(() => readDist(l.getAttribute('href')!.replace(/^\//, ''))).not.toThrow();
    }
  });
});

describe('diagrama no celular', () => {
  it('o script traz o painel para a vista quando o layout está empilhado', () => {
    const js = [...loadPage('pt').querySelectorAll('script:not([src])')].map((s) => s.textContent).join('\n');
    expect(js).toMatch(/scrollIntoView/);
    expect(js).toMatch(/max-width:\s*899px/);
  });
});
