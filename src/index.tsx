import { createRoot } from 'react-dom/client';
import { StoreProvider } from 'app/providers/storeProvider';
import { App } from 'app/App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
);
