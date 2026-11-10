import i18next from 'i18next';
import type { InterpolationOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import type { LanguageScope } from '@/utils';
import { loadAntdLocale } from './AntdRootConfig';
import enUS from '../../../internal/web/translation/en-US.json';

const FALLBACK = 'en-US';

// No locale uses $t(...) nesting, and its regex backtracks exponentially on an unclosed
// "$t(" in untrusted text (node-reported names, remarks); no off switch, so never match.
export const INTERPOLATION: InterpolationOptions = {
  escapeValue: false,
  prefix: '{',
  suffix: '}',
  nestingPrefix: '',
  nestingPrefixEscaped: '(?!)',
};

export async function readyI18n(_scope?: LanguageScope) {
  await i18next.use(initReactI18next).init({
    lng: FALLBACK,
    fallbackLng: FALLBACK,
    resources: { [FALLBACK]: { translation: enUS } },
    interpolation: INTERPOLATION,
    returnNull: false,
  });
  // The html files ship lang="en"; screen readers pick their voice from it (s-ui#1293).
  document.documentElement.lang = FALLBACK;
  await loadAntdLocale();
  return i18next;
}

export { i18next as i18n };
