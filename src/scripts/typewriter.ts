import { typewriterStep, type TypewriterState } from '../lib/typewriter';

const el = document.querySelector<HTMLElement>('[data-typewriter]');
const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

if (el && motionOk) {
  const words: string[] = JSON.parse(el.dataset.words ?? '[]');
  if (words.length > 0) {
    // O texto completo continua disponível para leitores de tela; só a parte visual anima.
    const label = el.textContent ?? '';
    el.setAttribute('aria-label', label);
    el.setAttribute('aria-live', 'off');
    el.classList.add('typing');
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
