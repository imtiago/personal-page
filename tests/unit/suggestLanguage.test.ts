import { describe, expect, it } from 'vitest';
import { suggestLanguage } from '../../src/lib/suggestLanguage';

const base = { browserLangs: ['es-AR', 'en'], current: 'pt', stored: null, pathname: '/' } as const;

describe('suggestLanguage', () => {
  it('sugere o primeiro idioma suportado do navegador', () => {
    expect(suggestLanguage(base)).toBe('es');
  });

  it('não sugere quando já existe preferência salva', () => {
    expect(suggestLanguage({ ...base, stored: 'pt' })).toBeNull();
  });

  it('só sugere na raiz /', () => {
    expect(suggestLanguage({ ...base, pathname: '/en/' })).toBeNull();
  });

  it('não sugere quando o navegador já está no idioma da página', () => {
    expect(suggestLanguage({ ...base, browserLangs: ['pt-BR'] })).toBeNull();
  });

  it('não sugere quando nenhum idioma do navegador é suportado', () => {
    expect(suggestLanguage({ ...base, browserLangs: ['fr-FR', 'de'] })).toBeNull();
  });

  it('ignora idiomas não suportados e usa o próximo', () => {
    expect(suggestLanguage({ ...base, browserLangs: ['fr', 'en-US'] })).toBe('en');
  });
});
