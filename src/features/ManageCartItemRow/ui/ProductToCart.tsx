import { LineItem } from 'entities/Cart';
import { CallstackType, FormattedPrice, PriceFormat } from 'shared/types';
import { setPrices, totalPriceConversion } from 'shared/lib/dataConverters';
import { DeleteProductButton, QuantityChangeButton } from './controlsElements';
import style from './ProductToCart.module.css';

interface DataProduct {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  image: string;
  prices: FormattedPrice;
  totalPrice: PriceFormat;
}

const productDataConversion = (product: LineItem): DataProduct => {
  const newProductEntry: DataProduct = {
    id: product.id,
    productId: product.productId,
    name: product.name['en-US' || ''],
    quantity: product.quantity,
    image: product.variant.images[0].url,
    prices: setPrices(product.price),
    totalPrice: product.totalPrice,
  };
  return newProductEntry;
};

export const ProductToCard = ({
  product,
  handler,
}: {
  product: LineItem;
  handler: (data: CallstackType) => void;
}): JSX.Element => {
  const { name, quantity, image, prices, totalPrice, productId } = productDataConversion(product);
  const { discountedPrice, currentPrice } = prices;

  return (
    <div className={style.product}>
      <img className={style.imgProduct} src={image}></img>
      <div className={style.dataProduct}>
        <h3 className={style.nameProduct}>{name}</h3>
        <DeleteProductButton productId={productId} handler={handler} />
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
              <QuantityChangeButton handler={handler} number={quantity} productId={productId} />
            </div>
          </div>
          <div className={`${style.priceProduct} ${style.amount}`}>
            {'Total Price'}
            <div className={style.totalAmount}>{totalPriceConversion(totalPrice)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
