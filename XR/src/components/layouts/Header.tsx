import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../config/constants';
import './Header.css';

interface HeaderProps {
  language?: 'en' | 'vn';
  onLanguageChange?: (lang: 'en' | 'vn') => void;
}

export function Header({ language = 'en', onLanguageChange }: HeaderProps) {
  const location = useLocation();

  const navItems = [
    { path: ROUTES.HOME, label: language === 'vn' ? 'Trang Chủ' : 'Home' },
    { path: ROUTES.MUSEUM, label: language === 'vn' ? 'Bảo Tàng' : 'Museum' },
    {
      path: ROUTES.MUSEUM_VR,
      label: language === 'vn' ? 'Bảo Tàng VR' : 'Museum VR',
    },
  ];

  return (
    <header className="header">
      <div className="header-container">
        <Link to={ROUTES.HOME} className="header-logo">
          {language === 'vn' ? 'Bảo Tàng Ảo' : 'Virtual Museum'}
        </Link>

        <nav className="header-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {onLanguageChange && (
          <div className="language-switcher">
            <button
              className={language === 'en' ? 'active' : ''}
              onClick={() => onLanguageChange('en')}
            >
              EN
            </button>
            <button
              className={language === 'vn' ? 'active' : ''}
              onClick={() => onLanguageChange('vn')}
            >
              VN
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
