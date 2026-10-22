import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrastRatio } from '../../src/lib/contrast';

const css = readFileSync('src/styles/global.css', 'utf8');
const token = (name: string) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-f]{6})`, 'i'))![1];
/** Cores de fundo/primeiro plano de um bloco de regra do global.css. */
const ruleColors = (selector: string) => {
  const body = css.match(new RegExp(`\\${selector}\\s*\\{([^}]*)\\}`))![1];
  return [...body.matchAll(/#[0-9a-f]{6}\b/gi)].map((m) => m[0]);
};

describe('contrastRatio', () => {
  it('branco sobre preto é 21:1', () => {
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 1);
  });
});

describe('contraste AA (≥ 4,5:1) dos pares de texto usados', () => {
  const bg = token('bg');
  const surface = token('surface');

  it.each([
    ['texto', token('text'), bg],
    ['texto secundário no fundo', token('muted'), bg],
    ['texto secundário em cartão', token('muted'), surface],
    ['eyebrow / links', token('primary-soft'), bg],
    ['chip', '#cfe4ff', surface],
  ])('%s', (_, fg, back) => {
    expect(contrastRatio(fg, back)).toBeGreaterThanOrEqual(4.5);
  });

  it.each(['.btn-primary', '.chip-hl'])('texto branco em todas as cores do gradiente de %s', (sel) => {
    for (const c of ruleColors(sel)) expect(contrastRatio('#ffffff', c), `${sel} ${c}`).toBeGreaterThanOrEqual(4.5);
  });
});
