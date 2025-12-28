import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import { useLanguageStore } from '@/stores/language.store';
import { Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

export function Header() {
  const location = useLocation();
  const {
    getLanguage,
    language: languageStore,
    languageList,
    setLanguage,
  } = useLanguageStore();
  const navItems = [
    { path: ROUTES.HOME, label: getLanguage('NAV_HOME') },
    { path: ROUTES.MUSEUM, label: getLanguage('NAV_MUSEUM') },
    {
      path: ROUTES.MUSEUM_VR,
      label: getLanguage('NAV_MUSEUM_VR'),
      xx: languageStore,
    },
    { path: ROUTES.ABOUT, label: getLanguage('NAV_ABOUT') },
    { path: ROUTES.AI_CHAT, label: 'VHSM AI' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] bg-zinc-950 backdrop-blur-[10px] z-[1000]">
      <div className="max-w-5xl mx-auto h-full px-10 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="text-2xl text-blue-50">
          {getLanguage('PAGE_NAME')}
        </Link>

        <nav className="flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base font-medium text-cbase-200 no-underline relative transition-colors duration-300 ease-in-out hover:text-[#1890ff] ${
                location.pathname === item.path
                  ? 'text-primary after:content-[""] after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-0.5 after:bg-[#1890ff]'
                  : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Dropdown
          menu={{
            items: Object.keys(languageList).map((lang) => ({
              key: lang,
              label: lang,
              onClick: () => setLanguage(lang),
            })),
          }}
          trigger={['click']}
        >
          <Button
            variant="outlined"
            ghost
            color="primary"
            icon={<GlobalOutlined />}
          >
            {getLanguage('LANGUAGE_SELECT')}
          </Button>
        </Dropdown>
      </div>
    </header>
  );
}
