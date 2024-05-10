import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';

export const checkBirthday = (): Rule[] => [
  { required: true },
  {
    validator: (_, value: string) => {
      const minimumAge = 13;
      const today = dayjs();
      const dateOfBirth = dayjs(value);
      const age = today.diff(dateOfBirth, 'year');
      if (age < minimumAge) {
        return Promise.reject(new Error(`You should be at least ${minimumAge} years old to make an order!`));
      }
      return Promise.resolve();
    },
  },
];
