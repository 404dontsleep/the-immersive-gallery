import { useLanguageStore } from '@/stores/language.store';
import { useEffect } from 'react';

export default function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchLanguageList } = useLanguageStore();
  useEffect(() => {
    fetchLanguageList();
  }, [fetchLanguageList]);
  return <>{children}</>;
}
