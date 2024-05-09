import { createRoot } from 'react-dom/client';

import { StoreProvider } from 'app/Providers/StoreProvider';
import { App } from 'app/App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
);
