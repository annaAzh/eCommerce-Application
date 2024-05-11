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
        return Promise.reject('Password must not be empty');
      } else if (checkTrailingSpaces(value)) {
        return Promise.reject('Password must not contain leading or trailing whitespace');
      } else if (checkContainOneSpecialCharacter(value)) {
        return Promise.reject('Password must contain at least one special character (!@#$%^&*)');
      } else if (checkContainOneDigit(value)) {
        return Promise.reject('Password must contain at least one digit (0-9)');
      } else if (checkContainOneLowercaseLetter(value)) {
        return Promise.reject('Password must contain at least one lowercase letter (a-z)');
      } else if (checkContainOneUppercaseLetter(value)) {
        return Promise.reject('Password must contain at least one uppercase letter (A-Z)');
      } else if (checkContainEightCharacters(value)) {
        return Promise.reject('Password must be at least 8 characters long');
      }
      return Promise.resolve();
    },
  },
];
