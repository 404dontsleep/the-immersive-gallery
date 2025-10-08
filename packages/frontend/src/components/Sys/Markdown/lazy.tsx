import { lazy, Suspense } from 'react';

const Markdown = lazy(() => import('./index'));

export default function LazyMarkdown({ text }: { text: string }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Markdown text={text} />
    </Suspense>
  );
}
