import style from './QuantityChangeButton.module.css';

export const QuantityChangeButton = ({ number }: { number: number }): JSX.Element => {
  return (
    <div className={style.buttonQuantity}>
      <button type="button" className={style.buttonRemove}>
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
      <button type="button" className={style.buttonAdd}>
        {'+'}
      </button>
    </div>
  );
};
