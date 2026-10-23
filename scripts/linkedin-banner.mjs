// Gera docs/linkedin/banner-{pt,en}.png (capa do LinkedIn, 1584×396 em 2x) a partir de scripts/linkedin-banner-template.html.
// Uso: node scripts/linkedin-banner.mjs
import { mkdirSync, readFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const dataUrl = (path, mime) => `data:${mime};base64,${readFileSync(path).toString('base64')}`;
const template = readFileSync('scripts/linkedin-banner-template.html', 'utf8')
  .replace('%%SG%%', dataUrl('node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2', 'font/woff2'))
  .replace('%%INTER%%', dataUrl('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'font/woff2'));

const flow = (field) =>
  [`<span>${field}</span>`, '<span class="chip hl">SAP FSM · SSAM</span>', '<span class="chip hl">SAP BTP</span>', '<span class="chip">S/4HANA</span>'].join(
    '<span class="arrow">⇄</span>',
  );
const URL = 'personal-page-steel-three.vercel.app';

const TEXT = {
  pt: { eyebrow: 'Consultor Técnico SAP', title: 'Do código ao <span class="grad">campo</span>.', flow: flow('Técnico em campo') },
  en: { eyebrow: 'SAP Technical Consultant', title: 'From code to the <span class="grad">field</span>.', flow: flow('Field technician') },
};

mkdirSync('docs/linkedin', { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1584, height: 396, deviceScaleFactor: 2 });
for (const [lang, t] of Object.entries(TEXT)) {
  const html = template.replace('%%EYEBROW%%', t.eyebrow).replace('%%TITLE%%', t.title).replace('%%FLOW%%', t.flow).replace('%%URL%%', URL);
  await page.setContent(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `docs/linkedin/banner-${lang}.png`, clip: { x: 0, y: 0, width: 1584, height: 396 } });
  console.log(`docs/linkedin/banner-${lang}.png`);
}
await browser.close();
