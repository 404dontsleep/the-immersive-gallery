import { useTranslation } from '@/hooks/useTranslation';
import { useThemeStore } from '@/stores/theme.store';
import { FloatButton } from 'antd';
import { CogIcon, LanguagesIcon, MoonIcon, SunIcon } from 'lucide-react';

export default function SysFloatButton() {
  const { setLanguage, language } = useTranslation();
  const { theme, toggleTheme } = useThemeStore();
  return (
    <FloatButton.Group
      trigger="click"
      type="default"
      shape="square"
      icon={<CogIcon />}
      style={{
        zIndex: 9999,
      }}
    >
      <FloatButton
        tooltip={language === 'default' ? 'EN' : 'VI'}
        icon={<LanguagesIcon />}
        onClick={() => setLanguage(language === 'default' ? 'vn' : 'default')}
      />
      <FloatButton
        icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleTheme}
      />
    </FloatButton.Group>
  );
}
