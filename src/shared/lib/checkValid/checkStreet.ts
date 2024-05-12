import { Rule } from 'antd/es/form';

export const checkStreet = (): Rule[] => [
  {
    validator: (_, value: string) => {
      if (!value) {
        return Promise.reject('Street name must not be empty');
      }
      return Promise.resolve();
    },
  },
];
