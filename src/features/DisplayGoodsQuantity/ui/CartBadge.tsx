import { Badge } from 'antd';
import { getCart } from 'entities/Cart';
import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';
import './CartBadge.css';

const CartBadge: FC = () => {
  const cart = useAppSelector(getCart);
  const totalCartQuantity = cart?.lineItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return <Badge count={totalCartQuantity} size="small" style={{ backgroundColor: '#6d972e' }}></Badge>;
};

export { CartBadge };
