import { Modal } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './ModalSlider.css';

interface ModalProps {
  visible: boolean;
  activeImg: number | undefined;
  images: string[];
  onClose: () => void;
}

export const ModalSlider = (props: ModalProps) => {
  if (!props.visible) return null;
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
      <Swiper
        loop={true}
        spaceBetween={3}
        navigation={true}
        centeredSlides={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="modalSwiper"
        initialSlide={props.activeImg}
      >
        {props.images.map((image: string, index: number) => {
          return (
            <SwiperSlide key={index}>
              <img src={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Modal>
  );
};
