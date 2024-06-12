import style from './InputApplyPromoCode.module.css';

export const InputApplyPromoCode = () => {
  return (
    <div className={style.applyBlock}>
      <input className={style.inputPromoCode} type="text" placeholder="Enter promo code"></input>
      <button className={style.buttonApply} type="button">
        Apply
      </button>
    </div>
  );
};
