const root = document.querySelector<HTMLElement>('[data-diagram]');
const nodes = [...(root?.querySelectorAll<HTMLButtonElement>('button[data-node]') ?? [])];
const panels = [...document.querySelectorAll<HTMLElement>('[data-panel]')];

function select(id: string) {
  for (const n of nodes) n.setAttribute('aria-pressed', String(n.dataset.node === id));
  for (const p of panels) p.hidden = p.dataset.panel !== id;
}

for (const n of nodes) {
  const id = n.dataset.node!;
  n.addEventListener('click', () => select(id));
  n.addEventListener('focus', () => select(id));
  if (window.matchMedia('(hover: hover)').matches) n.addEventListener('mouseenter', () => select(id));
}
