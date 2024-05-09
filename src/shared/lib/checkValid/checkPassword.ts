import { Rule } from 'antd/es/form';
import { checkContainEightCharacters } from './validationRules/checkContainEightCharacters';
import { checkContainOneDigit } from './validationRules/checkContainOneDigit ';
import { checkContainOneLowercaseLetter } from './validationRules/checkContainOneLowercaseLetter';
import { checkContainOneSpecialCharacter } from './validationRules/checkContainOneSpecialCharacter';
import { checkContainOneUppercaseLetter } from './validationRules/checkContainOneUppercaseLetter';
import { checkTrailingSpaces } from './validationRules/checkTrailingSpaces';

export const checkPassword = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject('incorrect password');
      } else if (checkTrailingSpaces(value)) {
        return Promise.reject('incorrect password');
      } else if (checkContainOneSpecialCharacter(value)) {
        return Promise.reject('incorrect password');
      } else if (checkContainOneDigit(value)) {
        return Promise.reject('incorrect password');
      } else if (checkContainOneLowercaseLetter(value)) {
        return Promise.reject('incorrect password');
      } else if (checkContainOneUppercaseLetter(value)) {
        return Promise.reject('incorrect password');
      } else if (checkContainEightCharacters(value)) {
        return Promise.reject('incorrect password');
      }
      return Promise.resolve();
    },
  },
];
