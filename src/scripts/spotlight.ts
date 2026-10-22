// Brilho que acompanha o cursor nos cartões; desligado em telas de toque.
if (window.matchMedia('(pointer: fine)').matches) {
  for (const card of document.querySelectorAll<HTMLElement>('[data-card]')) {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  }
}
