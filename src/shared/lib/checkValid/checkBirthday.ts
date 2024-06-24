import { Rule } from 'antd/es/form';
import dayjs from 'dayjs';

export const checkBirthday = (): Rule[] => [
  {
    validator: (_, value: string) => {
      const minimumAge = 13;
      const today = dayjs();
      const dateOfBirth = dayjs(value);
      const age = today.diff(dateOfBirth, 'year');
      if (!value) {
        return Promise.reject('Birthday date must not be empty');
      } else if (age < minimumAge) {
        return Promise.reject(`You must be at least ${minimumAge} years old to make an order!`);
      }
      return Promise.resolve();
    },
  },
];
