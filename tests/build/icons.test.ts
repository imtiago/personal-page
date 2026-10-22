import { describe, expect, it } from 'vitest';
import { loadPage } from './helpers';

describe('ícones', () => {
  it('preserva width/height dos elementos internos (ex.: o <rect> do envelope)', () => {
    const svg = loadPage('pt').querySelector('a[data-contact="email"] svg')!;
    const rect = svg.querySelector('rect')!;
    expect(rect.getAttribute('width')).toBe('20');
    expect(rect.getAttribute('height')).toBe('16');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
});
