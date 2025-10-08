import useDebounce from '@/hooks/useDebounce';
import { useThemeStore } from '@/stores/theme.store';
import Editor from '@monaco-editor/react';
import { useEffect, useRef, useState } from 'react';

type UnitValueProps = {
  value?: unknown;
  onChange?: (value: unknown) => void;
  options?: React.ComponentProps<typeof Editor>['options'];
};

const UnitValue: React.FC<UnitValueProps> = ({ value, onChange, options }) => {
  const [monacoValue, setMonacoValue] = useState<string>(
    JSON.stringify(value, null, 2),
  );
  const { debouncedValue } = useDebounce(value, 200);
  const editorRef = useRef<unknown>(null);
  const { theme } = useThemeStore();

  // Cờ để xác định có phải do user gõ hay không
  const isUserInputRef = useRef(false);

  useEffect(() => {
    // Nếu không phải do user gõ thì mới set lại value từ ngoài vào
    if (!isUserInputRef.current) {
      setMonacoValue(JSON.stringify(debouncedValue, null, 2));
    }
    isUserInputRef.current = false;
  }, [debouncedValue]);

  const handleEditorChange = (val?: string) => {
    if (options?.readOnly) return;
    isUserInputRef.current = true;
    setMonacoValue(val ?? '');
    if (onChange) {
      try {
        const parsed = val ? JSON.parse(val) : undefined;
        onChange(parsed);
      } catch {
        //
      }
    }
  };

  const handleEditorDidMount = (editor: unknown) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      value={monacoValue}
      height={300}
      language="json"
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
      options={{
        automaticLayout: true,
        ...options,
      }}
    />
  );
};

export default UnitValue;
