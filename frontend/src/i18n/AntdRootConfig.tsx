import type { ReactNode } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import type { ConfigProviderProps } from 'antd/es/config-provider';
import type { Locale } from 'antd/es/locale';
import enUSLocale from 'antd/es/locale/en_US';

const antdLocale: Locale = enUSLocale;

export async function loadAntdLocale(_language?: string): Promise<void> {
  // English is the only supported locale.
}

// A Form.Item tooltip icon sits inside its <label>, so its "question-circle" name
// became part of every hinted field's name. FormField exposes the hint as a description.
const FORM_CONFIG: ConfigProviderProps['form'] = {
  tooltip: { icon: <QuestionCircleOutlined aria-hidden /> },
};

export function AntdRootConfig({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider locale={antdLocale} form={FORM_CONFIG}>
      {children}
    </ConfigProvider>
  );
}
