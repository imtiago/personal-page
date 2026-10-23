const root = document.querySelector<HTMLElement>('[data-diagram]');
const nodes = [...(root?.querySelectorAll<HTMLButtonElement>('button[data-node]') ?? [])];
const panels = [...document.querySelectorAll<HTMLElement>('[data-panel]')];

const stacked = window.matchMedia('(max-width: 899px)');

function select(id: string) {
  for (const n of nodes) n.setAttribute('aria-pressed', String(n.dataset.node === id));
  for (const p of panels) p.hidden = p.dataset.panel !== id;
}

for (const n of nodes) {
  const id = n.dataset.node!;
  n.addEventListener('click', () => {
    select(id);
    // Empilhado, o painel fica abaixo dos 4 blocos: traz para a vista para o toque ter efeito visível.
    if (stacked.matches) {
      const panel = panels.find((p) => p.dataset.panel === id);
      const smooth = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
      panel?.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
    }
  });
  n.addEventListener('focus', () => select(id));
  if (window.matchMedia('(hover: hover)').matches) n.addEventListener('mouseenter', () => select(id));
}
