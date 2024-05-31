import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { getSelectedProduct } from 'features/SelectedProduct';
import { useAppSelector } from 'shared/lib/hooks';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './Slider.css';
import { ModalSlider } from '../ModalSlider/ui/ModalSlider';

export function Slider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [isModal, setModal] = useState(false);
  const [activeImg, setActiveImg] = useState('');
  const product = useAppSelector(getSelectedProduct);
  const onClose = () => setModal(false);
  const { images } = product;

  return (
    <>
      <Swiper
        direction="vertical"
        onSwiper={setThumbsSwiper}
        loop={true}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((image: string, index: number) => {
          return (
            <SwiperSlide key={index}>
              <img src={image} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        loop={true}
        spaceBetween={3}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image: string, index: number) => {
          return (
            <SwiperSlide key={index}>
              <img
                onClick={() => {
                  setModal(true);
                  setActiveImg(image);
                }}
                src={image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ModalSlider visible={isModal} image={activeImg} onClose={onClose} />
    </>
  );
}
