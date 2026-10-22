import { gzipSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { allCss, distAssets, loadPage, readDist } from './helpers';

/** Devolve o texto de cada bloco @media (prefers-reduced-motion:no-preference){...}, com chaves balanceadas. */
function motionBlocks(css: string): string[] {
  const blocks: string[] = [];
  const re = /@media\s*\(prefers-reduced-motion:\s*no-preference\)\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css))) {
    let depth = 1;
    let i = m.index + m[0].length;
    while (depth > 0 && i < css.length) {
      if (css[i] === '{') depth++;
      else if (css[i] === '}') depth--;
      i++;
    }
    blocks.push(css.slice(m.index, i));
  }
  return blocks;
}

const css = allCss();
const outside = motionBlocks(css).reduce((acc, b) => acc.replace(b, ''), css);

describe('melhoria progressiva', () => {
  it('a página marca elementos para revelação ao rolar', () => {
    expect(loadPage('pt').querySelectorAll('[data-reveal]').length).toBeGreaterThan(5);
  });

  it('a regra que esconde [data-reveal] só existe sob .js e movimento permitido', () => {
    const hiding = /[^{}]*\[data-reveal\][^{}]*\{[^}]*opacity:\s*0[;}]/g;
    expect(outside.match(hiding) ?? []).toEqual([]);
    const inside = motionBlocks(css).join('\n').match(hiding) ?? [];
    expect(inside.length).toBeGreaterThan(0);
    for (const rule of inside) expect(rule).toMatch(/\.js/);
  });

  it('animações infinitas (aurora, fios do diagrama) só rodam com movimento permitido', () => {
    expect(outside).not.toMatch(/animation[^;{}]*infinite/);
  });

  it('o JS total do site fica abaixo de 15 KB gzip', () => {
    const total = distAssets('.js').reduce((sum, f) => sum + gzipSync(readDist(f)).length, 0);
    const inline = [...loadPage('pt').querySelectorAll('script:not([src]):not([type="application/ld+json"])')]
      .map((s) => gzipSync(s.textContent ?? '').length)
      .reduce((a, b) => a + b, 0);
    expect(total + inline).toBeLessThan(15360);
  });
});
