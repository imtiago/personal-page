// Gera public/og/{pt,en,es}.png (1200×630) a partir de scripts/og-template.html.
// Uso: node scripts/og.mjs
import { mkdirSync, readFileSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const dataUrl = (path, mime) => `data:${mime};base64,${readFileSync(path).toString('base64')}`;
const template = readFileSync('scripts/og-template.html', 'utf8')
  .replace('%%SG%%', dataUrl('node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2', 'font/woff2'))
  .replace('%%INTER%%', dataUrl('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2', 'font/woff2'))
  .replace('%%AVATAR%%', dataUrl('src/assets/avatar.png', 'image/png'));

const TEXT = {
  pt: { eyebrow: 'Consultor Técnico SAP', role: 'Implementação de <b>SAP FSM · SSAM</b> e integrações com <b>SAP BTP</b>' },
  en: { eyebrow: 'SAP Technical Consultant', role: '<b>SAP FSM · SSAM</b> implementations and <b>SAP BTP</b> integrations' },
  es: { eyebrow: 'Consultor Técnico SAP', role: 'Implementación de <b>SAP FSM · SSAM</b> e integraciones con <b>SAP BTP</b>' },
};

mkdirSync('public/og', { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
for (const [lang, t] of Object.entries(TEXT)) {
  await page.setContent(template.replace('%%EYEBROW%%', t.eyebrow).replace('%%ROLE%%', t.role), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/${lang}.png`, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log(`public/og/${lang}.png`);
}
await browser.close();
