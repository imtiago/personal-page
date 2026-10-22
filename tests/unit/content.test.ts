import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import * as content from '../../src/content';
import { localized } from '../../src/content/schema';

const { projects, certifications, courses, profile, about } = content;

describe('conteúdo', () => {
  it('tem 5 projetos SAP', () => {
    expect(projects.filter((p) => p.kind === 'sap')).toHaveLength(5);
  });

  it('os cases em destaque estão na ordem aprovada', () => {
    expect(projects.filter((p) => p.featured).map((p) => p.id)).toEqual([
      'minasligas',
      'pluz',
      'armac',
      'inventory-system',
    ]);
  });

  it('a linha do tempo tem Norte Energia e WPS', () => {
    expect(projects.filter((p) => !p.featured).map((p) => p.id)).toEqual(['norte-energia', 'wps']);
  });

  it('Seal Telecom não aparece em nenhum conteúdo', () => {
    expect(JSON.stringify(content)).not.toMatch(/seal/i);
  });

  it('tem 4 certificações e 8 cursos', () => {
    expect(certifications).toHaveLength(4);
    expect(courses).toHaveLength(8);
  });

  it('os números do crachá são 5+ anos, 5 projetos SAP e 4 certificações', () => {
    expect(profile.stats).toEqual({ years: '5+', sapProjects: 5, certs: 4 });
  });

  it('os idiomas em PT são nativo + 2 intermediários', () => {
    expect(about.languages.pt).toEqual([
      'Português — nativo',
      'Inglês — intermediário',
      'Espanhol — intermediário',
    ]);
  });

  it('localized exige os 3 idiomas', () => {
    expect(localized(z.string()).safeParse({ pt: 'a', en: 'b' }).success).toBe(false);
  });
});
