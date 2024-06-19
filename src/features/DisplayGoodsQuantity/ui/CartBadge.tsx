import { Badge } from 'antd';
import { getCart } from 'entities/Cart';
import { FC } from 'react';
import { useAppSelector } from 'shared/lib/hooks';
import './CartBadge.css';

interface CartBadgeProps {
  children: React.ReactNode;
}

const CartBadge: FC<CartBadgeProps> = ({ children }) => {
  const cart = useAppSelector(getCart);
  const totalCartQuantity = cart?.lineItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <Badge count={totalCartQuantity} size="small" style={{ backgroundColor: '#6d972e' }}>
      {children}
    </Badge>
  );
};

export { CartBadge };
