import { Rule } from 'antd/es/form';

export const checkStreet = (): Rule[] => [
  { required: true, whitespace: true },
  {
    validator: (_, value: string) => {
      if (!value || value.length === 0) {
        return Promise.reject('incorrect city');
      }
      return Promise.resolve();
    },
  },
];
