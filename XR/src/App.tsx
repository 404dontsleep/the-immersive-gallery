import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { XRProvider } from './providers/XRProvider';
import LanguageProvider from './providers/LanguageProvider';
import { Image } from 'antd';
Image.defaultProps = {
  fallback: 'https://placehold.co/600x400/?text=Image+not+found',
  preview: false,
  style: {
    borderRadius: 8,
  },
};
function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <XRProvider>
          <AppRoutes />
        </XRProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
