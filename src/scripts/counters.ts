import { counterValue } from '../lib/counter';

const DURATION = 1200;
const counters = [...document.querySelectorAll<HTMLElement>('[data-count]')];
const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

function animate(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix ?? '';
  const start = performance.now();
  const frame = (now: number) => {
    const t = (now - start) / DURATION;
    el.textContent = `${counterValue(target, t)}${suffix}`;
    if (t < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

if (motionOk && counters.length > 0 && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        io.unobserve(e.target);
        animate(e.target as HTMLElement);
      }
    },
    { threshold: 0.6 },
  );
  for (const c of counters) io.observe(c);
}
