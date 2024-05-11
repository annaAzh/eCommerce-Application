import { Rule } from 'antd/es/form';
import postalCodes from 'postal-codes-js';

type GetFieldValueType = { getFieldValue: (fieldName: string) => string };

export const checkPostalCode = (): Rule[] => [
  { required: true, whitespace: true },
  ({ getFieldValue }: GetFieldValueType) => ({
    validator(_, value: string) {
      if (!value || !getFieldValue('country')) {
        return Promise.reject('Please, choose country before');
      }
      if (postalCodes.validate(getFieldValue('country'), value) !== true) {
        return Promise.reject('Incorrect postal code!');
      }
      return Promise.resolve();
    },
  }),
];
