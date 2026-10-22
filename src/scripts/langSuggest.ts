import { isLang, type Lang } from '../i18n/langs';
import { suggestLanguage } from '../lib/suggestLanguage';

const KEY = 'lang';

function readStored(): Lang | null {
  try {
    const v = localStorage.getItem(KEY);
    return isLang(v) ? v : null;
  } catch {
    return null;
  }
}

function store(lang: Lang) {
  try {
    localStorage.setItem(KEY, lang);
  } catch {
    /* armazenamento indisponível: a sugestão pode reaparecer, sem outro efeito */
  }
}

const root = document.querySelector<HTMLElement>('[data-lang-suggest]');
const current = root?.dataset.current;

if (root && isLang(current)) {
  for (const a of document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]')) {
    a.addEventListener('click', () => {
      if (isLang(a.dataset.langLink)) store(a.dataset.langLink);
    });
  }

  const target = suggestLanguage({
    browserLangs: navigator.languages ?? [navigator.language],
    current,
    stored: readStored(),
    pathname: location.pathname,
  });
  const box = target ? root.querySelector<HTMLElement>(`[data-suggest-for="${target}"]`) : null;

  if (target && box) {
    root.hidden = false;
    box.hidden = false;
    box.querySelector('[data-suggest-yes]')?.addEventListener('click', () => store(target));
    box.querySelector('[data-suggest-no]')?.addEventListener('click', () => {
      store(current);
      root.hidden = true;
    });
  }
}
