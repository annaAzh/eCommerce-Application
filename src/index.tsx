import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './app';
import { store } from 'store/index';

const root = createRoot(document.getElementById('root') as HTMLDivElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
