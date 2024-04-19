import { FormInputData } from '@/shared';

export interface LoginInputs {
  email: string;
  password: string;
}

export const loginFields: FormInputData<LoginInputs>[] = [
  {
    name: 'email',
    type: 'email',
    label: 'Email',
    placeholder: 'Укажите ваш email',
    rules: {
      required: 'Email обязателен для заполнения',
      maxLength: {
        value: 255,
        message: 'Максимальное кол-во символов - 255',
      },
      minLength: {
        value: 6,
        message: 'Минимальное кол-во символов - 6',
      },
      validate: async (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
          return 'Некорректный email';
        }

        const isEmailUnique = await checkEmailUniqueness(value);
        if (!isEmailUnique) {
          return 'Email уже используется';
        }

        return true;
      },
    },
  },
  {
    name: 'password',
    type: 'password',
    label: 'Пароль',
    placeholder: '12345678',
    rules: {
      required: 'Пароль обязателен для заполнения',
      minLength: {
        value: 6,
        message: 'Минимальное кол-во символов - 6',
      },
      maxLength: {
        value: 30,
        message: 'Максимальное кол-во символов - 30',
      },
      validate: (value: string) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return (
          regex.test(value) ||
          'Пароль должен содержать как минимум одну букву и одну цифру'
        );
      },
    },
  },
];

const checkEmailUniqueness = async (email: string): Promise<boolean> => {
  return true;
};
