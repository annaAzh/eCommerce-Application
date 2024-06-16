import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import style from './FieldApplyPromoCode.module.css';
import { useEffect, useState } from 'react';
import { DiscountCode, clearCartError } from 'entities/Cart';
import { getCartError } from 'entities/Cart/model/selectors/getCartError';
import { setNotificationMessage } from 'entities/NotificationTool';

export const FieldApplyPromoCode = ({
  applyCode,
  removeCode,
  discountCodes,
}: {
  applyCode: (value: string) => void;
  removeCode: () => void;
  discountCodes: DiscountCode[];
}) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(getCartError);
  const [inputValue, getInputValue] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [display, setDisplay] = useState<'none' | 'block'>();

  useEffect(() => {
    if (discountCodes.length > 0) {
      setDisabled(true);
      setDisplay('block');
    }
    if (discountCodes.length <= 0) {
      setDisabled(false);
      setDisplay('none');
    }
  });

  useEffect(() => {
    if (!error) return;
    dispatch(
      setNotificationMessage({
        message: error,
        type: 'error',
      }),
    );
    dispatch(clearCartError());
    getInputValue('');
  }, [error]);

  return (
    <>
      <form className={style.applyBlock}>
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
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            applyCode(inputValue);
          }}
        >
          Apply
        </button>
        <div
          className={style.cancelPromoCode}
          style={{ display: display }}
          onClick={() => {
            removeCode();
            getInputValue('');
          }}
        >
          {'Cancel promo code'} &#10006;
        </div>
      </form>
    </>
  );
};
