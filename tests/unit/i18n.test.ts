import { describe, expect, it } from 'vitest';
import { isLang, pathFor } from '../../src/i18n/langs';
import pt from '../../src/i18n/ui/pt.json';
import en from '../../src/i18n/ui/en.json';
import es from '../../src/i18n/ui/es.json';

describe('langs', () => {
  it('pathFor gera as rotas de cada idioma', () => {
    expect(pathFor('pt')).toBe('/');
    expect(pathFor('en')).toBe('/en/');
    expect(pathFor('es')).toBe('/es/');
  });

  it('isLang aceita só os idiomas suportados', () => {
    expect(isLang('es')).toBe(true);
    expect(isLang('fr')).toBe(false);
  });
});

describe('ui json', () => {
  const keys = (o: object) => Object.keys(o).sort();

  it('os 3 idiomas têm exatamente as mesmas chaves', () => {
    expect(keys(en)).toEqual(keys(pt));
    expect(keys(es)).toEqual(keys(pt));
  });

  it('nenhum texto de interface está vazio', () => {
    for (const dict of [pt, en, es]) {
      for (const [k, v] of Object.entries(dict)) expect(v.trim(), k).not.toBe('');
    }
  });
});
