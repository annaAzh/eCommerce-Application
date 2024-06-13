import { Popconfirm } from 'antd';
import style from './DeleteProductButton.module.css';
import DeleteIcon from 'shared/assets/img/deleteProduct.svg';

export const DeleteProductButton = ({
  deleteProduct,
  lineItemId,
}: {
  deleteProduct: (value: string) => void;
  lineItemId: string;
}) => {
  return (
    <Popconfirm
      title="Delete product"
      description="Are you sure you want to remove the product?"
      okText="Yes"
      okType="default"
      cancelText="No"
      onConfirm={() => deleteProduct(lineItemId)}
    >
      <img src={DeleteIcon} className={style.deleteButton}></img>
    </Popconfirm>
  );
};
