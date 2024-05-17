import { createRoot } from 'react-dom/client';
import { StoreProvider } from 'app/providers/storeProvider';
import { App } from 'app/App';
import { BrowserRouter } from 'react-router-dom';
import { Header } from 'widgets/Header';
import { NotificationTool } from 'entities/NotificationTool';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <StoreProvider>
      <NotificationTool />
      <Header />
      <App />
    </StoreProvider>
  </BrowserRouter>,
);
