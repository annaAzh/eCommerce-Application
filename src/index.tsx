import { createRoot } from 'react-dom/client';

import App from './app';
import StoreProvider from './app/providers/storeProvider';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
);
