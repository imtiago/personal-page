import { describe, expect, it } from 'vitest';
import { counterValue } from '../../src/lib/counter';

describe('counterValue', () => {
  it('começa em 0 e termina no alvo', () => {
    expect(counterValue(5, 0)).toBe(0);
    expect(counterValue(5, 1)).toBe(5);
  });

  it('não passa do alvo quando t > 1', () => {
    expect(counterValue(5, 2)).toBe(5);
  });

  it('usa easing out cubic (rápido no início)', () => {
    expect(counterValue(4, 0.5)).toBe(4);
  });
});
