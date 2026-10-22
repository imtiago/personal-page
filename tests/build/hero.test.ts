import { describe, expect, it } from 'vitest';
import { LANGS } from '../../src/i18n/langs';
import { loadPage } from './helpers';

describe.each(LANGS)('hero (%s)', (lang) => {
  const doc = loadPage(lang);
  const hero = doc.getElementById('inicio')!;

  it('o h1 tem Tiago e Oliveira em gradiente', () => {
    const h1 = hero.querySelector('h1')!;
    expect(h1.textContent).toContain('Tiago');
    expect(h1.querySelector('.grad-text')?.textContent).toContain('Oliveira');
    expect(doc.querySelectorAll('h1')).toHaveLength(1);
  });

  it('sem JS mostra "SAP FSM/SSAM" e define as palavras do typewriter', () => {
    const tw = hero.querySelector('[data-typewriter]')!;
    expect(tw.textContent?.trim()).toBe('SAP FSM/SSAM');
    expect(JSON.parse(tw.getAttribute('data-words')!)).toEqual(['SAP FSM', 'SAP SSAM']);
    expect(tw.closest('p')?.textContent).toContain('SAP BTP');
  });

  it('o typewriter reserva a largura do texto mais longo (sem layout shift)', () => {
    const wrapper = hero.querySelector('[data-typewriter-box]')!;
    const ghost = wrapper.querySelector('[data-typewriter-ghost]')!;
    expect(ghost.getAttribute('aria-hidden')).toBe('true');
    expect(ghost.textContent?.trim()).toBe('SAP FSM/SSAM');
    expect(wrapper.querySelector('[data-typewriter]')).not.toBeNull();
  });

  it('os contadores mostram os valores finais no HTML', () => {
    expect([...hero.querySelectorAll('[data-count]')].map((c) => c.textContent?.trim())).toEqual(['5+', '5', '4']);
  });

  it('o avatar é otimizado e tem alt e dimensões', () => {
    const img = hero.querySelector('img')!;
    expect(img.getAttribute('alt')).toBeTruthy();
    expect(img.getAttribute('width')).toBeTruthy();
    expect(img.getAttribute('height')).toBeTruthy();
    expect(img.getAttribute('src')).toMatch(/^\/_astro\//);
  });

  it('a faixa de clientes lista os 5 clientes em ordem', () => {
    const names = [...hero.querySelectorAll('[data-client]')].map((c) => c.textContent?.trim());
    expect(names).toEqual(['MINASLIGAS', 'PLUZ', 'ARMAC', 'NORTE ENERGIA', 'WPS']);
  });

  it('sem CV cadastrado o botão "Baixar CV" não existe', () => {
    expect(hero.querySelector('[data-cv]')).toBeNull();
  });

  it('mostra o status disponível', () => {
    expect(hero.querySelector('[data-status]')).not.toBeNull();
  });
});
