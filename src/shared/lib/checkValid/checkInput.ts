import { Rule } from 'antd/es/form';
import { checkContainOnlyLetters } from './validationRules/checkContainOnlyLetters';

export const checkInput = (fieldName: string): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject(`${fieldName} must not be empty`);
      } else if (checkContainOnlyLetters(value)) {
        return Promise.reject(`${fieldName} can contain only latin letters`);
      }
      return Promise.resolve();
    },
  },
];
