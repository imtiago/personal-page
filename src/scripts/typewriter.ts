import { typewriterStep, type TypewriterState } from '../lib/typewriter';

const el = document.querySelector<HTMLElement>('[data-typewriter]');
const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (el && motionOk) {
  const words: string[] = JSON.parse(el.dataset.words ?? '[]');
  if (words.length > 0) {
    // Leitores de tela leem o <span class="sr-only"> estável; este span é aria-hidden.
    let state: TypewriterState = { word: 0, chars: words[0].length, deleting: false };
    const tick = () => {
      const next = typewriterStep(state, words);
      state = next;
      el.textContent = words[state.word].slice(0, state.chars);
      window.setTimeout(tick, next.pauseMs);
    };
    el.textContent = words[0];
    window.setTimeout(tick, 1600);
  }
}
