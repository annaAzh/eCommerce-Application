import { AutoPlay } from '@egjs/flicking-plugins';
import Flicking from '@egjs/react-flicking';
import style from './OnSaleBlock.module.css';
import '@egjs/react-flicking/dist/flicking.css';
import saleIcon from '../../../shared/assets/img/onSale.svg';
import { GreenButtonWithPlus } from 'shared/ui';
import { useNavigate } from 'react-router-dom';
import { Paths } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { addSearchCategory, getAllCategories } from 'entities/Product';
import { HashLoader } from 'react-spinners';

interface CategoryList {
  category: string;
  title: string;
  discount: string;
}

const pluginsLeft = [new AutoPlay({ duration: 3000, direction: 'NEXT', stopOnHover: true })];
const pluginsRight = [new AutoPlay({ duration: 3000, direction: 'PREV', stopOnHover: true })];

const saleCategories: CategoryList[] = [
  { category: 'Dogs', title: 'Beds', discount: '30%' },
  { category: 'Cats', title: 'Dry food', discount: '10%' },
  { category: 'Dogs', title: 'Treats', discount: '15%' },
  { category: 'Small Pets', title: 'Cages', discount: '50%' },
];

export const OnSaleBlock = () => {
  const navigate = useNavigate();
  const categories = useAppSelector(getAllCategories);
  const dispatch = useAppDispatch();

  const click = (name: string, title: string) => {
    categories.forEach((category) => {
      if (category.name === name) {
        category.subCategory.forEach((sub) => {
          if (sub.name === title) dispatch(addSearchCategory({ categoriesId: sub.id }));
        });
      }
    });
    navigate(`/${Paths.catalog}`);
  };

  return (
    <div className={style.wrapper}>
      {categories.length > 0 ? (
        <div className={style.container}>
          <div className={style.leftSide}>
            <Flicking circular={true} plugins={pluginsLeft} horizontal={false} panelsPerView={1}>
              {saleCategories.map((line, index) => (
                <div className={`${style.leftItem} ${style[`img${index}`]}`} key={index}>
                  <div className={style.saleLeft}>
                    <img className={style.svgLeft} src={saleIcon} alt="sale" />
                    <div className={style.saleCover}>
                      <div>{line.discount}</div>
                      <div>{line.title}</div>
                    </div>
                    <GreenButtonWithPlus
                      disabled={false}
                      text="shop now"
                      handler={() => click(line.category, line.title)}
                    />
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
              {saleCategories.map((line, index) => (
                <div className={`${style.rightItem} ${style[`img${index}`]}`} key={index}>
                  <div className={style.saleRight}>
                    <img className={style.svgRight} src={saleIcon} alt="sale" />
                    <div className={style.saleCover}>
                      <div>{line.discount}</div>
                      <div>{line.title}</div>
                    </div>
                    <GreenButtonWithPlus
                      disabled={false}
                      text="shop now"
                      handler={() => click(line.category, line.title)}
                    />
                  </div>
                </div>
              ))}
            </Flicking>
          </div>
        </div>
      ) : (
        <div className={style.container}>
          <HashLoader color="#6d972e" cssOverride={{ margin: 'auto' }} size={80} />
        </div>
      )}
    </div>
  );
};
