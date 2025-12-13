import { useState } from 'react';
import type { ReactNode } from 'react';
import { Header } from './Header';
import './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function PageLayout({ children, showHeader = true }: PageLayoutProps) {
  const [language, setLanguage] = useState<'en' | 'vn'>('vn');

  return (
    <div className="page-layout">
      {showHeader && (
        <Header language={language} onLanguageChange={setLanguage} />
      )}
      <main className={`page-content ${showHeader ? 'with-header' : ''}`}>
        {children}
      </main>
    </div>
  );
}
