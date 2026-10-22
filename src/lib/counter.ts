export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

export function counterValue(target: number, t: number): number {
  return Math.round(target * easeOutCubic(Math.min(1, Math.max(0, t))));
}
