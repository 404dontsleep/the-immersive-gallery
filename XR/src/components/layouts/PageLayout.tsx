import type { ReactNode } from 'react';
import { Header } from './Header';
import './PageLayout.css';

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

export function PageLayout({ children, showHeader = true }: PageLayoutProps) {
  return (
    <div className="page-layout bg-museum-50">
      {showHeader && <Header />}
      <main className={`page-content ${showHeader ? 'with-header' : ''}`}>
        {children}
      </main>
    </div>
  );
}
