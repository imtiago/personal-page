import { describe, expect, it } from 'vitest';
import { allCss, loadPage } from './helpers';

describe('smoke', () => {
  it('a página PT declara lang pt-BR', () => {
    expect(loadPage('pt').documentElement.getAttribute('lang')).toBe('pt-BR');
  });

  it('o CSS gerado contém o token de fundo #060f1f', () => {
    expect(allCss().toLowerCase()).toContain('#060f1f');
  });
});
