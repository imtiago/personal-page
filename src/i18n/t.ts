import type { Lang } from './langs';
import pt from './ui/pt.json';
import en from './ui/en.json';
import es from './ui/es.json';

export type UiKey = keyof typeof pt;

const DICTS: Record<Lang, Record<UiKey, string>> = { pt, en, es };

export function useTranslations(lang: Lang): (key: UiKey) => string {
  return (key) => DICTS[lang][key];
}
