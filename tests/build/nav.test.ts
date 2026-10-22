import { describe, expect, it } from 'vitest';
import { LANGS, pathFor } from '../../src/i18n/langs';
import { loadPage } from './helpers';

describe.each(LANGS)('menu (%s)', (lang) => {
  const doc = loadPage(lang);
  const header = doc.querySelector('header')!;
  const nav = header.querySelector('nav')!;

  it('não exibe o nome/logo no topo', () => {
    expect(header.textContent).not.toMatch(/tiago\.oliveira|Tiago Oliveira/i);
  });

  it('o primeiro elemento interativo do menu é o seletor de idioma', () => {
    const first = nav.querySelector('a, button')!;
    expect(first.closest('[data-lang-switcher]')).not.toBeNull();
  });

  it('o seletor tem 3 links com lang próprio e aria-current só no atual', () => {
    const links = [...nav.querySelectorAll('[data-lang-switcher] a')];
    expect(links.map((a) => a.getAttribute('href'))).toEqual(LANGS.map(pathFor));
    expect(links.map((a) => a.getAttribute('lang'))).toEqual(['pt-BR', 'en', 'es']);
    expect(links.filter((a) => a.getAttribute('aria-current') === 'page').map((a) => a.getAttribute('href'))).toEqual([
      pathFor(lang),
    ]);
  });

  it('os links de seção apontam para as âncoras corretas', () => {
    const hrefs = [...nav.querySelectorAll('[data-section-links] a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['#expertise', '#projetos', '#certificacoes', '#sobre', '#contato']);
  });

  it('o botão do menu mobile tem aria-expanded=false e aria-controls', () => {
    const btn = header.querySelector('button[data-menu-toggle]')!;
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    expect(doc.getElementById(btn.getAttribute('aria-controls')!)).not.toBeNull();
  });
});
