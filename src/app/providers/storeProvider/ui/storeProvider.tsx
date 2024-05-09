import { PropsWithChildren, ReactNode } from 'react';
import { store } from '../config/store';
import { Provider } from 'react-redux';

export const StoreProvider = (children: PropsWithChildren) => {
  return(
    <Provider store={store}>
      {children as ReactNode}
    </Provider>
  )
};
