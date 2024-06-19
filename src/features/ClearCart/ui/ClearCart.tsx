import { QuestionCircleOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { FC } from 'react';
import './style.css';

export const ClearCart: FC<{ handler: () => void }> = ({ handler }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'end' }}>
      <Popconfirm
        title="clear cart"
        description="Are you sure to clear the cart?"
        onConfirm={handler}
        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
      >
        <button className="clear-button">
          <span className="circle1"></span>
          <span className="circle2"></span>
          <span className="circle3"></span>
          <span className="circle4"></span>
          <span className="circle5"></span>
          <span className="text">Clear Shopping Cart</span>
        </button>
      </Popconfirm>
    </div>
  );
};
