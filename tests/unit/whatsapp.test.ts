import { describe, expect, it } from 'vitest';
import { whatsappUrl } from '../../src/lib/whatsapp';

describe('whatsappUrl', () => {
  it('monta o link wa.me com a mensagem codificada', () => {
    expect(whatsappUrl('5568999676543', 'Olá, Tiago!')).toBe('https://wa.me/5568999676543?text=Ol%C3%A1%2C%20Tiago!');
  });

  it('rejeita número com caracteres que não são dígitos', () => {
    expect(() => whatsappUrl('+55 68 99967-6543', 'x')).toThrow();
  });

  it('rejeita número curto demais', () => {
    expect(() => whatsappUrl('123', 'x')).toThrow();
  });
});
