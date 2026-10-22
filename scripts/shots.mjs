// Screenshots de QA e checagem de overflow horizontal.
// Uso: node scripts/shots.mjs [--base http://localhost:4321] [--widths 320,375,768,1440] [--langs pt,en,es] [--js on,off] [--full]
import { mkdirSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : def;
};
const base = arg('base', 'http://localhost:4321');
const widths = arg('widths', '320,375,768,1440').split(',').map(Number);
const langs = arg('langs', 'pt,en,es').split(',');
const jsModes = arg('js', 'on,off').split(',');
const full = process.argv.includes('--full');
const reduced = process.argv.includes('--reduced');
const PATHS = { pt: '/', en: '/en/', es: '/es/' };

mkdirSync('shots', { recursive: true });
const browser = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
let failures = 0;
for (const js of jsModes) {
  for (const lang of langs) {
    for (const width of widths) {
      const page = await browser.newPage();
      if (js === 'off') {
        // Simula um visitante sem JavaScript: o HTML chega sem nenhum <script>.
        // (setJavaScriptEnabled(false) impediria a medição de overflow via evaluate.)
        await page.setRequestInterception(true);
        page.on('request', async (req) => {
          if (req.resourceType() !== 'document') return req.continue();
          const res = await fetch(req.url());
          const html = (await res.text()).replace(/<script\b[\s\S]*?<\/script>/gi, '');
          req.respond({ status: res.status, contentType: 'text/html; charset=utf-8', body: html });
        });
      }
      await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
      if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.evaluateOnNewDocument((l) => localStorage.setItem('lang', l), lang);
      await page.goto(base + PATHS[lang], { waitUntil: 'networkidle0' });
      // Rola a página inteira para disparar as revelações ao rolar antes do screenshot.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 400) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
      await new Promise((r) => setTimeout(r, 1500));
      const { scrollWidth, innerWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      if (scrollWidth > innerWidth) {
        failures++;
        console.log(`OVERFLOW ${lang} ${width} js=${js} scrollWidth=${scrollWidth}`);
      }
      const file = `shots/${lang}-${width}-js${js}${reduced ? '-reduced' : ''}.png`;
      await page.screenshot({ path: file, fullPage: full });
      await page.close();
    }
  }
}
await browser.close();
console.log(failures ? `${failures} overflow(s)` : 'no overflow');
process.exit(failures ? 1 : 0);
