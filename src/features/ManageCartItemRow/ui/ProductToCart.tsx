import { LineItem } from 'entities/Cart';
import { CallstackType, FormattedPrice } from 'shared/types';
import { setPrices, totalPriceConversion, totalPriceWithoutDiscounts } from 'shared/lib/dataConverters';
import { DeleteProductButton, QuantityChangeButton } from './controlsElements';
import style from './ProductToCart.module.css';

interface DataProduct {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  image: string;
  prices: FormattedPrice;
  totalPrice: string;
  totalPriseNotDiscount: string;
  discountPrice: string | undefined;
}

const productDataConversion = (product: LineItem): DataProduct => {
  const newProductEntry: DataProduct = {
    id: product.id,
    productId: product.productId,
    name: product.name['en-US' || ''],
    quantity: product.quantity,
    image: product.variant.images[0].url,
    prices: setPrices(product.price),
    totalPrice: totalPriceConversion(product.totalPrice),
    totalPriseNotDiscount: totalPriceWithoutDiscounts(product),
    discountPrice: product.discountedPrice ? totalPriceConversion(product.discountedPrice.value) : undefined,
  };
  return newProductEntry;
};

export const ProductToCart = ({
  product,
  handler,
}: {
  product: LineItem;
  handler: (data: CallstackType) => void;
}): JSX.Element => {
  const { name, quantity, image, prices, totalPrice, productId, discountPrice, totalPriseNotDiscount } =
    productDataConversion(product);
  const { discountedPrice, currentPrice } = prices;

  return (
    <div className={style.product}>
      <img className={style.imgProduct} src={image}></img>
      <div className={style.dataProduct}>
        <h3 className={style.nameProduct}>{name}</h3>
        <DeleteProductButton productId={productId} handler={handler} />
        <div className={style.productPrices}>
          {discountedPrice && (
            <div className={style.priceProduct}>
              {'Sale Price'}
              <div className={style.discountedPrice}>{discountedPrice}</div>
              <div className={style.priceNotDiscount}>{currentPrice}</div>
            </div>
          )}
          {discountPrice && (
            <div className={`${style.priceProduct} ${style.notDiscount}`}>
              {'Discounted Price'}
              <div className={style.discountedPrice}>{discountPrice}</div>
              <div className={style.priceNotDiscount}>{currentPrice}</div>
            </div>
          )}
          {!discountPrice && !discountedPrice && (
            <div className={`${style.priceProduct} ${style.notDiscount}`}>
              {'Price'}
              <div className={style.currentPrice}>{currentPrice}</div>
            </div>
          )}
          <div className={style.priceProduct}>
            {'Quantity'}
            <div className={style.quantity}>
              <QuantityChangeButton handler={handler} number={quantity} productId={productId} />
            </div>
          </div>
          <div className={`${style.priceProduct} ${style.amount}`}>
            {'Total Price'}
            {discountedPrice && (
              <>
                <div className={`${style.totalAmount} ${style.sale}`}>{totalPrice}</div>
                <div className={style.totalAmountNotDiscount}>{totalPriseNotDiscount}</div>
              </>
            )}
            {discountPrice && (
              <>
                <div className={`${style.totalAmount} ${style.sale}`}>{totalPrice}</div>
                <div className={style.totalAmountNotDiscount}>{totalPriseNotDiscount}</div>
              </>
            )}
            {!discountedPrice && !discountPrice && <div className={style.totalAmount}>{totalPrice}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
