import { GithubOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AboutUsType } from 'shared/types';
import style from './AboutUsDetails.module.css';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type SliderTeamsProps = {
  images: string[];
};

const SliderTeams: FC<SliderTeamsProps> = ({ images }) => {
  return (
    <Swiper className={style.slider} slidesPerView={1} centeredSlides={true} navigation={true} modules={[Navigation]}>
      {images.map((img, index) => {
        return (
          <SwiperSlide className={style.sliderItem} key={index}>
            <img className={style.img} src={img} alt="team image" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export const AboutUsDetails: FC<AboutUsType> = (props) => {
  const { name, bio, contribution, role, githubLink, color, images } = props;
  return (
    <div className={style.detailContainer} style={{ backgroundColor: `${color}` }}>
      <div className={style.imgContainer}>
        <SliderTeams images={images} />
      </div>
      <div>
        <Link className={style.link} to={githubLink} target="_blank">
          {name}
          <GithubOutlined style={{ marginLeft: '10px', marginRight: '10px' }} />
          <span>🐾</span>
        </Link>
        <p className={style.description}>
          <b>Role:</b> {role}
        </p>
        <p className={style.description}>
          <b>Bio:</b> {bio}
        </p>
        <p>
          <b>Contribution:</b> {contribution}
        </p>
      </div>
    </div>
  );
};
