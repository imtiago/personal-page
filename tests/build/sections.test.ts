import { describe, expect, it } from 'vitest';
import { LANGS } from '../../src/i18n/langs';
import { useTranslations } from '../../src/i18n/t';
import { loadPage } from './helpers';

describe.each(LANGS)('seções (%s)', (lang) => {
  const doc = loadPage(lang);
  const t = useTranslations(lang);
  const $ = (id: string) => doc.getElementById(id)!;

  it('as seções aparecem na ordem aprovada', () => {
    const ids = [...doc.querySelectorAll('main > section[id]')].map((s) => s.id);
    expect(ids).toEqual([
      'inicio',
      'expertise',
      'arquitetura',
      'metodo',
      'projetos',
      'certificacoes',
      'recomendacoes',
      'sobre',
      'contato',
    ]);
  });

  it('expertise tem 3 cartões, FSM primeiro e BTP segundo', () => {
    const cards = [...$('expertise').querySelectorAll('[data-card]')];
    expect(cards).toHaveLength(3);
    expect(cards[0].querySelector('h3')?.textContent).toContain('FSM');
    expect(cards[1].querySelector('h3')?.textContent).toContain('BTP');
  });

  it('o diagrama tem 4 nós em ordem, controlando um painel', () => {
    const nodes = [...$('arquitetura').querySelectorAll('button[data-node]')];
    expect(nodes.map((n) => n.getAttribute('data-node'))).toEqual(['erp', 'btp', 'fsm', 'field']);
    for (const n of nodes) {
      const panel = doc.getElementById(n.getAttribute('aria-controls')!);
      expect(panel?.getAttribute('role')).toBe('region');
    }
  });

  it('sem JS o painel do BTP está visível e o nó BTP pressionado', () => {
    const btp = $('arquitetura').querySelector('button[data-node="btp"]')!;
    expect(btp.getAttribute('aria-pressed')).toBe('true');
    const visible = [...$('arquitetura').querySelectorAll('[data-panel]')].filter((p) => !p.hasAttribute('hidden'));
    expect(visible.map((p) => p.getAttribute('data-panel'))).toEqual(['btp']);
  });

  it('o diagrama tem uma descrição para leitores de tela', () => {
    expect($('arquitetura').querySelector('.sr-only')?.textContent).toBe(t('arch.srDescription'));
  });

  it('o método tem 4 etapas numeradas 01–04', () => {
    const nums = [...$('metodo').querySelectorAll('[data-step-number]')].map((n) => n.textContent?.trim());
    expect(nums).toEqual(['01', '02', '03', '04']);
  });

  it('projetos: 4 cases em destaque na ordem, com o case dev etiquetado e linkado', () => {
    const cases = [...$('projetos').querySelectorAll('article[data-featured]')];
    expect(cases.map((c) => c.getAttribute('data-id'))).toEqual(['minasligas', 'pluz', 'armac', 'inventory-system']);
    const dev = cases[3];
    expect(dev.textContent).toContain(t('projects.devTag'));
    const repo = dev.querySelector('a[href="https://github.com/imtiago/inventory-system"]')!;
    expect(repo.getAttribute('rel')).toContain('noopener');
  });

  it('a linha do tempo tem Norte Energia e WPS', () => {
    const items = [...$('projetos').querySelectorAll('[data-timeline] li')].map((li) => li.textContent);
    expect(items).toHaveLength(2);
    expect(items[0]).toContain('Norte Energia');
    expect(items[1]).toContain('WPS');
  });

  it('não renderiza bloco de resultado quando não há resultado', () => {
    expect($('projetos').querySelector('[data-result]')).toBeNull();
  });

  it('não menciona Seal Telecom nem usa emojis', () => {
    const html = doc.documentElement.outerHTML;
    expect(html).not.toMatch(/seal/i);
    const body = doc.body.cloneNode(true) as HTMLElement;
    for (const s of body.querySelectorAll('script')) s.remove();
    // Emoji_Presentation = caracteres exibidos como emoji por padrão (©, ⇄ etc. são texto).
    expect(body.textContent).not.toMatch(/\p{Emoji_Presentation}|\uFE0F/u);
  });
});
