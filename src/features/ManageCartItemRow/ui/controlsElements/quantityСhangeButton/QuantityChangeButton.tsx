import { CallstackType } from 'shared/types';
import style from './QuantityChangeButton.module.css';

export const QuantityChangeButton = ({
  number,
  productId,
  handler,
}: {
  number: number;
  productId: string;
  handler: (data: CallstackType) => void;
}): JSX.Element => {
  return (
    <div className={style.buttonQuantity}>
      <button
        type="button"
        className={style.buttonRemove}
        onClick={() => handler({ type: 'remove', payload: productId })}
      >
        {'-'}
      </button>
      <input
        type="button"
        step={1}
        min={0}
        max={100}
        value={number}
        inputMode="numeric"
        className={style.inputNumber}
      ></input>
      <button type="button" className={style.buttonAdd} onClick={() => handler({ type: 'add', payload: productId })}>
        {'+'}
      </button>
    </div>
  );
};
