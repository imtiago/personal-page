import { isLang, type Lang } from '../i18n/langs';

export interface SuggestInput {
  browserLangs: readonly string[];
  current: Lang;
  stored: Lang | null;
  pathname: string;
}

export function suggestLanguage({ browserLangs, current, stored, pathname }: SuggestInput): Lang | null {
  if (stored || pathname !== '/') return null;
  const match = browserLangs.map((l) => l.toLowerCase().split('-')[0]).find(isLang);
  return match && match !== current ? match : null;
}
