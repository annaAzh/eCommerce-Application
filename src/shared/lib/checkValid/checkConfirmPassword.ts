import { Rule } from 'antd/es/form';

type GetFieldValueType = { getFieldValue: (fieldName: string) => string };

export const checkConfirmPassword = (): Rule[] => [
  { required: true },
  ({ getFieldValue }: GetFieldValueType) => ({
    validator(_, value: string): Promise<void> {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject('The new password that you entered do not match!');
    },
  }),
];
