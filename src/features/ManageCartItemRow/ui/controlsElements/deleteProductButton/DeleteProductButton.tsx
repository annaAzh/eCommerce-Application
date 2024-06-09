import { Popconfirm } from 'antd';
import { getCart } from 'entities/Cart';
import { getAccessToken } from 'entities/User';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { clearRemoteCart } from 'entities/Cart/model/services/clearRemoteCart';
import style from './DeleteProductButton.module.css';
import DeleteIcon from 'shared/assets/img/deleteProduct.svg';

export const DeleteProductButton = ({ lineItemId }: { lineItemId: string }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getAccessToken);
  const cart = useAppSelector(getCart);

  const deleteProduct = () => {
    if (token && cart.id && cart.version) {
      dispatch(clearRemoteCart({ token, version: cart.version, cartId: cart.id, lineItemId: [lineItemId] }));
    }
  };

  return (
    <Popconfirm
      title="Delete product"
      description="Are you sure you want to remove the product?"
      okText="Yes"
      okType="default"
      cancelText="No"
      onConfirm={deleteProduct}
    >
      <img src={DeleteIcon} className={style.deleteButton}></img>
    </Popconfirm>
  );
};
