import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';

export type TestLang = 'pt' | 'en' | 'es';

const DIST = join(process.cwd(), 'dist');
const PAGE: Record<TestLang, string> = { pt: 'index.html', en: 'en/index.html', es: 'es/index.html' };

export function readDist(path: string): string {
  return readFileSync(join(DIST, path), 'utf8');
}

export function loadPage(lang: TestLang): Document {
  return parseHTML(readDist(PAGE[lang])).document as unknown as Document;
}

export function distAssets(ext: '.css' | '.js'): string[] {
  return readdirSync(join(DIST, '_astro')).filter((f) => f.endsWith(ext)).map((f) => `_astro/${f}`);
}

export function allCss(): string {
  return distAssets('.css').map(readDist).join('\n');
}
