import { MarkdownHooks } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStarryNight from 'rehype-starry-night';
import rehypeSanitize from 'rehype-sanitize';
import rehypeRaw from 'rehype-raw';
import componentsMap from './components';
import { useThemeStore } from '@/stores/theme.store';
type SysMarkdownProps = {
  text: string;
};

export default function SysMarkdown({ text }: SysMarkdownProps) {
  const { theme } = useThemeStore();
  return (
    <div className={theme === 'dark' ? 'dark' : 'light'}>
      <div className="markdown-body">
        <MarkdownHooks
          components={{
            code: (args) => {
              const { children, className } = args;
              if (
                componentsMap[className ?? ''] &&
                typeof children === 'string'
              ) {
                return componentsMap[className ?? '']({ children });
              }
              return args.children;
            },
          }}
          children={text}
          remarkPlugins={[remarkGfm, remarkRehype]}
          rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeStarryNight]}
        />
      </div>
    </div>
  );
}
