import { render } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

describe('AntdRootConfig locale', () => {
  afterEach(() => {
    document.cookie = 'lang=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
  });

  it('always renders antd built-in text in English', async () => {
    vi.resetModules();
    document.cookie = 'lang=fa-IR; path=/';
    const { readyI18n } = await import('@/i18n/react');
    const { AntdRootConfig } = await import('@/i18n/AntdRootConfig');
    const { Empty } = await import('antd');

    await readyI18n('panel');
    render(
      <AntdRootConfig>
        <Empty />
      </AntdRootConfig>,
    );

    expect(document.querySelector('.ant-empty-description')?.textContent).toBe('No data');
  });
});
