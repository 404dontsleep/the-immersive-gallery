import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { XRProvider } from './providers/XRProvider';

function App() {
  return (
    <BrowserRouter>
      <XRProvider>
        <AppRoutes />
      </XRProvider>
    </BrowserRouter>
  );
}

export default App;
