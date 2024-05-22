import { Rule } from 'antd/es/form';
import { checkContainDomain } from './validationRules/checkContainDomain';
import { checkEmailFormat } from './validationRules/checkEmailFormat';
import { checkTrailingSpaces } from './validationRules/checkTrailingSpaces';
import { checkEmailSeparator } from './validationRules/checkEmailSeparator';

export const checkEmail = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject('Email must not be empty');
      } else if (checkTrailingSpaces(value)) {
        return Promise.reject('Email must not contain leading or trailing whitespace');
      } else if (checkEmailSeparator(value)) {
        return Promise.reject('Email  must contain an @ symbol');
      } else if (checkContainDomain(value)) {
        return Promise.reject('Email must contain a domain name (e.g., example.com)');
      } else if (checkEmailFormat(value)) {
        return Promise.reject('Email must be in English and formatted like user@example.com');
      }
      return Promise.resolve();
    },
  },
];
