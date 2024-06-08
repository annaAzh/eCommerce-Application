import { FC, useState } from 'react';
import './style.css';

interface Props {
  text: string;
  handler?: () => void;
  disabled: boolean;
}

export const GreenButtonWithPlus: FC<Props> = ({ text, handler, disabled }) => {
  const [isDisabled, setIsDisabled] = useState(disabled);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log(1);
    if (!isDisabled && handler) {
      setIsDisabled(true);
      handler();
    }
  };
  return (
    <button type="button" className="button" onClick={handleClick} disabled={disabled ? disabled : false}>
      <span className="button__text">{text}</span>
      <span className="button__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="currentColor"
          height="24"
          fill="none"
          className="svg"
        >
          <line y2="19" y1="5" x2="12" x1="12"></line>
          <line y2="12" y1="12" x2="19" x1="5"></line>
        </svg>
      </span>
    </button>
  );
};
