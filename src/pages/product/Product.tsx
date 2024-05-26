import { SelectedProduct, getSelectedError } from 'features/Product';
import { NotFound } from 'pages/notFound/NotFound';
import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks/useAppSelect/useAppSelect';

export const Product: FC = () => {
  const error = useAppSelector(getSelectedError);
  return error ? <NotFound /> : <SelectedProduct />;
};
