import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LANGS } from '../../src/i18n/langs';

describe.each(LANGS)('imagem OG (%s)', (lang) => {
  const path = `public/og/${lang}.png`;

  it('existe e tem 1200×630', () => {
    expect(existsSync(path)).toBe(true);
    const png = readFileSync(path);
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });
});

describe('favicon', () => {
  it('é o monograma TO', () => {
    expect(readFileSync('public/favicon.svg', 'utf8')).toContain('>TO<');
  });
});
