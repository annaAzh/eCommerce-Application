import { Rule } from 'antd/es/form';

type GetFieldValueType = { getFieldValue: (fieldName: string) => string };

export const checkConfirmPassword = (): Rule[] => [
  ({ getFieldValue }: GetFieldValueType) => ({
    validator(_, value: string): Promise<void> {
      if (!value) {
        return Promise.reject('The field must not be empty');
      }
      if (getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The new password that you entered do not match!');
    },
  }),
];
