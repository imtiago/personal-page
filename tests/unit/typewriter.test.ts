import { describe, expect, it } from 'vitest';
import { typewriterStep } from '../../src/lib/typewriter';

const words = ['ab', 'c'];

describe('typewriterStep', () => {
  it('digita um caractere por passo', () => {
    expect(typewriterStep({ word: 0, chars: 0, deleting: false }, words)).toEqual({
      word: 0,
      chars: 1,
      deleting: false,
      pauseMs: 70,
    });
  });

  it('ao completar a palavra passa a apagar após uma pausa longa', () => {
    expect(typewriterStep({ word: 0, chars: 2, deleting: false }, words)).toMatchObject({
      deleting: true,
      pauseMs: 1600,
    });
  });

  it('apaga um caractere por passo', () => {
    expect(typewriterStep({ word: 0, chars: 1, deleting: true }, words)).toMatchObject({ chars: 0, pauseMs: 35 });
  });

  it('ao apagar tudo avança para a próxima palavra', () => {
    expect(typewriterStep({ word: 0, chars: 0, deleting: true }, words)).toEqual({
      word: 1,
      chars: 0,
      deleting: false,
      pauseMs: 300,
    });
  });

  it('volta para a primeira palavra depois da última', () => {
    expect(typewriterStep({ word: 1, chars: 0, deleting: true }, words)).toMatchObject({ word: 0 });
  });
});
