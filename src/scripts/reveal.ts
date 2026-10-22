const items = [...document.querySelectorAll<HTMLElement>('[data-reveal]')];

if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );
  for (const el of items) io.observe(el);
} else {
  for (const el of items) el.classList.add('is-visible');
}
