import { describe, expect, it } from 'vitest';
import { pickActiveSection } from '../../src/lib/activeSection';

const sections = [
  { id: 'a', top: 0 },
  { id: 'b', top: 800 },
  { id: 'c', top: 1600 },
];

describe('pickActiveSection', () => {
  it('retorna a última seção cujo topo já passou do scroll + offset', () => {
    expect(pickActiveSection(sections, 0, 100)).toBe('a');
    expect(pickActiveSection(sections, 750, 100)).toBe('b');
    expect(pickActiveSection(sections, 5000, 100)).toBe('c');
  });

  it('retorna null antes da primeira seção', () => {
    expect(pickActiveSection([{ id: 'a', top: 500 }], 0, 100)).toBeNull();
  });
});
