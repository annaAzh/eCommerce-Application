import { AutoPlay } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import style from './OnSaleBlock.module.css';
import '@egjs/react-flicking/dist/flicking.css';
import saleIcon from '../../../shared/assets/img/onSale.svg';
import { GreenButtonWithPlus } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'shared/types';

const pluginsLeft = [new AutoPlay({ duration: 4000, direction: 'NEXT', stopOnHover: false })];
const pluginsRight = [new AutoPlay({ duration: 4000, direction: 'PREV', stopOnHover: false })];

const saleCategories = ['dry food', 'dry food', 'treats', 'beds', 'cages'];

export const OnSaleBlock = () => {
  const navigate = useNavigate();

  const click = () => {
    navigate(`/${Paths.catalog}`);
  };

  return (
    <div className={style.wrapper}>
      <h3>Sales</h3>
      <div className={style.container}>
        <div className={style.leftSide}>
          <Flicking circular={true} plugins={pluginsLeft} horizontal={false} panelsPerView={1}>
            {saleCategories.map((title, index) => (
              <div className={`${style.leftItem} ${style[`img${index}`]}`} key={index}>
                <div className={style.saleLeft}>
                  <img className={style.svgLeft} src={saleIcon} alt="sale" />
                  {title}
                  <GreenButtonWithPlus disabled={false} text="shop now" handler={click} />
                </div>
              </div>
            ))}
          </Flicking>
        </div>
        <div className={style.rightSide}>
          <Flicking
            circular={true}
            plugins={pluginsRight}
            horizontal={false}
            panelsPerView={2}
            align={'next'}
            defaultIndex={saleCategories.length - 1}
          >
            {saleCategories.map((title, index) => (
              <div className={`${style.rightItem} ${style[`img${index}`]}`} key={index}>
                <div className={style.saleRight}>
                  <img className={style.svgRight} src={saleIcon} alt="sale" />
                  {title}

                  <GreenButtonWithPlus disabled={false} text="shop now" handler={click} />
                </div>
              </div>
            ))}
          </Flicking>
        </div>
      </div>
    </div>
  );
};
