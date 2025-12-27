import { useLanguageStore } from '@/stores/language.store';
import { useThemeStore } from '@/stores/theme.store';
import { FloatButton } from 'antd';
import { CogIcon, LanguagesIcon, MoonIcon, SunIcon } from 'lucide-react';

export default function SysFloatButton() {
  const { language, setLanguage, getLanguage } = useLanguageStore();
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
        tooltip={getLanguage('LANGUAGE_SELECT')}
        icon={<LanguagesIcon />}
        onClick={() => setLanguage(language === 'EN' ? 'VN' : 'EN')}
      />
      <FloatButton
        icon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        onClick={toggleTheme}
      />
    </FloatButton.Group>
  );
}
