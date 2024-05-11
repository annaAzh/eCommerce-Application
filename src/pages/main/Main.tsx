import { FC } from 'react';
import ImgKittens from './../../shared/assets/img/kittens.png';
import './Main.css';

export const Main: FC = () => {
  return (
    <div>
      <img className="img-kittens" src={ImgKittens} alt="kittens"></img>
    </div>
  );
};
