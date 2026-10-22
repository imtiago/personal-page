export const LANGS = ['pt', 'en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'pt';

export const HTML_LANG: Record<Lang, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

export const OG_LOCALE: Record<Lang, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' };

export function pathFor(lang: Lang): string {
  return lang === DEFAULT_LANG ? '/' : `/${lang}/`;
}

export function isLang(x: unknown): x is Lang {
  return typeof x === 'string' && (LANGS as readonly string[]).includes(x);
}
