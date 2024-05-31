import { Modal } from 'antd';
import './ModalSlider.css';

interface ModalProps {
  visible: boolean;
  image: string;
  onClose: () => void;
}

export const ModalSlider = (props: ModalProps) => {
  return (
    <Modal
      open={props.visible}
      className="container"
      styles={{ footer: { display: 'flex', justifyContent: 'center' } }}
      okButtonProps={{
        style: { display: 'none' },
      }}
      cancelButtonProps={{
        style: { margin: '0 auto' },
      }}
      cancelText="Close"
      onCancel={props.onClose}
      width={900}
    >
      <img className="img-modal" src={props.image}></img>
    </Modal>
  );
};
