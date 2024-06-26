import { Rule } from 'antd/es/form';
import postalCodes from 'postal-codes-js';
import { COUNTRIES } from 'shared/consts';

type GetFieldValueType = { getFieldValue: (fieldName: string) => string };

export const checkPostalCode = (fieldDependencies: string): Rule[] => [
  ({ getFieldValue }: GetFieldValueType) => ({
    validator(_, value: string) {
      const countryCode = getFieldValue(`${fieldDependencies}`);
      const country = COUNTRIES.find((elem) => elem.value === countryCode);

      if (!value) {
        return Promise.reject('Postal code must not be empty');
      } else if (!getFieldValue(`${fieldDependencies}`)) {
        return Promise.reject('Please, choose country before');
      } else if (postalCodes.validate(countryCode, value) !== true) {
        return Promise.reject(`Invalid postal code format for ${country?.title}!`);
      }
      return Promise.resolve();
    },
  }),
];
