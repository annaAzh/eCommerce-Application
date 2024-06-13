import { useAppDispatch } from 'shared/lib/hooks';
import style from './FieldApplyPromoCode.module.css';
import { useState } from 'react';
import { DiscountCode, applyPromoCode } from 'entities/Cart';

export const FieldApplyPromoCode = ({
  version,
  id,
  token,
  //discountCodes,
}: {
  version: number;
  id: string;
  token: string;
  discountCodes: DiscountCode[];
}) => {
  const dispatch = useAppDispatch();
  const [inputValue, getInputValue] = useState('');
  const [disabled, setDisabled] = useState(false);

  // useEffect(() => {
  //   if(discountCodes.length > 0) setDisabled(true)
  // })

  const applyCode = (code: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const elem: HTMLElement = event.target as HTMLElement;
    dispatch(applyPromoCode({ code, token, cartId: id, version }));
    setDisabled(true);
    elem.style.display = 'none';
  };

  return (
    <div className={style.applyBlock}>
      <input
        className={style.inputPromoCode}
        type="text"
        disabled={disabled}
        placeholder="Enter promo code"
        value={inputValue}
        onChange={(event) => getInputValue(event.target.value)}
      ></input>
      <button
        className={style.buttonApply}
        disabled={disabled}
        type="button"
        onClick={(event) => applyCode(inputValue, event)}
      >
        Apply
      </button>
    </div>
  );
};
