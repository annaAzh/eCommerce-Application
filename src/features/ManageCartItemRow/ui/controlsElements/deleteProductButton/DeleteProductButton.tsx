import { Popconfirm } from 'antd';
import style from './DeleteProductButton.module.css';
import DeleteIcon from 'shared/assets/img/deleteProduct.svg';
import { CallstackType } from 'shared/types';

export const DeleteProductButton = ({
  handler,
  productId,
}: {
  handler: (data: CallstackType) => void;
  productId: string;
}) => {
  return (
    <Popconfirm
      title="Delete product"
      description="Are you sure you want to remove the product?"
      okText="Yes"
      okType="default"
      cancelText="No"
      onConfirm={() => handler({ type: 'clear', payload: productId })}
    >
      <img src={DeleteIcon} className={style.deleteButton}></img>
    </Popconfirm>
  );
};
