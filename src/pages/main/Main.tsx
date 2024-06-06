import { FC } from 'react';
import ImgKittens from 'shared/assets/img/kittensMain.png';
import './Main.css';

export const Main: FC = () => {
  return (
    <div className="wrapper-main">
      <img className="img-kittens" src={ImgKittens} alt="kittens"></img>
    </div>
  );
};
