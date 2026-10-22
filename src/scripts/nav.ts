import { pickActiveSection } from '../lib/activeSection';

const header = document.querySelector<HTMLElement>('[data-site-header]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const menu = document.getElementById('menu-principal');
const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-section-links] a')];
const sections = links
  .map((a) => document.getElementById(a.hash.slice(1)))
  .filter((el): el is HTMLElement => el !== null);

function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('is-scrolled', y > 24);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  const active = pickActiveSection(
    sections.map((s) => ({ id: s.id, top: s.offsetTop })),
    y,
    window.innerHeight * 0.35,
  );
  for (const a of links) {
    if (a.hash === `#${active}`) a.setAttribute('aria-current', 'true');
    else a.removeAttribute('aria-current');
  }
}

function setMenu(open: boolean) {
  if (!toggle || !menu) return;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? '');
  toggle.querySelector('.menu-icon-open')?.classList.toggle('hidden', open);
  toggle.querySelector('.menu-icon-close')?.classList.toggle('hidden', !open);
  menu.classList.toggle('is-open', open);
}

toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
for (const a of links) a.addEventListener('click', () => setMenu(false));

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
onScroll();
