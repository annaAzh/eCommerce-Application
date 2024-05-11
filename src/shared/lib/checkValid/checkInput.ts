import { Rule } from 'antd/es/form';
import { checkContainOnlyLetters } from './validationRules/checkContainOnlyLetters';

export const checkInput = (fieldName: string): Rule[] => [
  { required: true, whitespace: true },
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject(`incorrect ${fieldName}`);
      } else if (checkContainOnlyLetters(value)) {
        return Promise.reject(`incorrect ${fieldName}`);
      }
      return Promise.resolve();
    },
  },
];
