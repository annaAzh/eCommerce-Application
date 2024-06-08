import { LineItem } from 'entities/Cart';
import { FormattedPrice, PriceFormat } from 'shared/types';
import { setPrices } from 'shared/lib/dataConverters';
import { QuantityChangeButton } from './controlsElements';
import style from './ProductToCart.module.css';

interface DataProduct {
  name: string;
  quantity: number;
  image: string;
  prices: FormattedPrice;
  totalPrice: PriceFormat;
}

const totalPriceConversion = (totalPrice: PriceFormat): string => {
  const { currencyCode, centAmount, fractionDigits } = totalPrice;
  const discountedCurrency = currencyCode === 'USD' ? '$' : '';
  const discountedPrice = `${(centAmount / 100).toFixed(fractionDigits)}${discountedCurrency}`;
  return discountedPrice;
};

const productDataConversion = (product: LineItem): DataProduct => {
  const newProductEntry: DataProduct = {
    name: product.name['en-US' || ''],
    quantity: product.quantity,
    image: product.variant.images[0].url,
    prices: setPrices(product.price),
    totalPrice: product.totalPrice,
  };
  return newProductEntry;
};

export const ProductToCard = ({ product }: { product: LineItem }): JSX.Element => {
  const { name, quantity, image, prices, totalPrice } = productDataConversion(product);
  const { discountedPrice, currentPrice } = prices;

  return (
    <div className={style.product}>
      <img className={style.imgProduct} src={image}></img>
      <div className={style.dataProduct}>
        <h2>{name}</h2>
        <div className={style.productPrices}>
          {discountedPrice ? (
            <div className={style.priceProduct}>
              {'Discounted Price'}
              <div className={style.discountedPrice}>{discountedPrice}</div>
            </div>
          ) : (
            <div className={`${style.priceProduct} ${style.notDiscount}`}>
              {'Price'}
              <div className={style.currentPrice}> {currentPrice}</div>
            </div>
          )}
          <div className={style.priceProduct}>
            {'Quantity'}
            <div className={style.quantity}>
              <QuantityChangeButton number={quantity} />
            </div>
          </div>
          <div className={`${style.priceProduct} ${style.amount}`}>
            {'Total Amount'}
            <div className={style.totalAmount}>{totalPriceConversion(totalPrice)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
