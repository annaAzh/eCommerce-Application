import { Rule } from 'antd/es/form';
import { checkContainDomain } from './validationRules/checkContainDomain';
import { checkEmailFormat } from './validationRules/checkEmailFormat';
import { checkTrailingSpaces } from './validationRules/checkTrailingSpaces';

export const checkEmail = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject('incorrect email');
      } else if (checkTrailingSpaces(value)) {
        return Promise.reject('incorrect email');
      } else if (checkContainDomain(value)) {
        return Promise.reject('incorrect email');
      } else if (checkEmailFormat(value)) {
        return Promise.reject('incorrect email');
      }
      return Promise.resolve();
    },
  },
];
