export function pickActiveSection(
  sections: readonly { id: string; top: number }[],
  scrollY: number,
  offset: number,
): string | null {
  let active: string | null = null;
  for (const s of sections) if (s.top <= scrollY + offset) active = s.id;
  return active;
}
