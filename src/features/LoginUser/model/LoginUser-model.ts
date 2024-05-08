import { Rule } from 'antd/es/form';
import {
  checkTrailingSpaces,
  checkContainOneSpecialCharacter,
  checkContainOneDigit,
  checkContainOneLowercaseLetter,
  checkContainOneUppercaseLetter,
  checkContainEightCharacters,
  checkContainDomain,
  checkEmailFormat,
} from '../../../shared';

const checkPassword = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject(new Error('incorrect password'));
      } else if (checkTrailingSpaces(value)) {
        return Promise.reject(new Error('incorrect password'));
      } else if (checkContainOneSpecialCharacter(value)) {
        return Promise.reject(new Error('incorrect password'));
      } else if (checkContainOneDigit(value)) {
        return Promise.reject(new Error('incorrect password'));
      } else if (checkContainOneLowercaseLetter(value)) {
        return Promise.reject(new Error('incorrect password'));
      } else if (checkContainOneUppercaseLetter(value)) {
        return Promise.reject(new Error('incorrect password'));
      } else if (checkContainEightCharacters(value)) {
        return Promise.reject(new Error('incorrect password'));
      }
      return Promise.resolve();
    },
  },
];

const checkEmail = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject(new Error('incorrect email'));
      } else if (checkTrailingSpaces(value)) {
        return Promise.reject(new Error('incorrect email'));
      } else if (checkContainDomain(value)) {
        return Promise.reject(new Error('incorrect email'));
      } else if (checkEmailFormat(value)) {
        return Promise.reject(new Error('incorrect email'));
      }
      return Promise.resolve();
    },
  },
];

export { checkPassword, checkEmail };
