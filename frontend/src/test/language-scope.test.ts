import { afterEach, describe, expect, it, vi } from 'vitest';

describe('English-only language support', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('keeps panel and subscription language English regardless of browser preference', async () => {
    vi.resetModules();
    const utils = await import('@/utils');
    const cookies = new Map<string, string>([['lang', 'fa-IR']]);
    vi.spyOn(utils.CookieManager, 'getCookie').mockImplementation(
      (name) => cookies.get(name) ?? '',
    );
    vi.spyOn(utils.CookieManager, 'setCookie').mockImplementation((name, value) => {
      cookies.set(name, value);
    });
    const reload = vi.fn();
    vi.stubGlobal('window', { navigator: { language: 'fa-IR' }, location: { reload } });
    vi.stubGlobal('document', { documentElement: {} });

    expect(utils.LanguageManager.getLanguage()).toBe('en-US');
    expect(utils.LanguageManager.getLanguage('subscription')).toBe('en-US');
    expect(cookies.get('lang')).toBe('en-US');
    expect(cookies.get('subLang')).toBe('en-US');

    const { readyI18n } = await import('@/i18n/react');
    await readyI18n('subscription');
    expect(document.documentElement.lang).toBe('en-US');

    utils.LanguageManager.setLanguage('fa-IR', 'subscription');
    expect(cookies.get('subLang')).toBe('en-US');
    expect(reload).toHaveBeenCalledOnce();
  });

  it('does not resolve the language for empty or invalid dates', async () => {
    const utils = await import('@/utils');
    const getLanguage = vi.spyOn(utils.LanguageManager, 'getLanguage').mockReturnValue('en-US');

    expect(utils.IntlUtil.formatDate(null)).toBe('');
    expect(utils.IntlUtil.formatDate(undefined)).toBe('');
    expect(utils.IntlUtil.formatDate('not-a-date')).toBe('');
    expect(getLanguage).not.toHaveBeenCalled();
  });
});
