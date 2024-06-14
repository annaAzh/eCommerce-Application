import { FC } from 'react';
import ImgKittens from 'shared/assets/img/kittensMain.png';
import './Main.css';
import { PromoCodeList } from 'features/DisplayPromoCode';

export const Main: FC = () => {
  return (
    <div className="wrapper-main">
      <PromoCodeList />
      <img className="img-kittens" src={ImgKittens} alt="kittens"></img>
    </div>
  );
};
