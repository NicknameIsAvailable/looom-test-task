import { FormInputData } from '@/shared';

export interface RegistrationInputs {
  first_name: string;
  second_name: string;
  phone: string;
  email: string;
  password: string;
  repeatPassword: string;
  city: string;
}

export const registrationFields: FormInputData<RegistrationInputs>[] = [
  {
    name: 'first_name',
    type: 'text',
    label: 'Имя',
    placeholder: 'Напишите ваше имя',
    rules: {
      required: 'Имя обязательно для заполнения',
      minLength: {
        value: 2,
        message: 'Минимальное кол-во символов - 2',
      },
      maxLength: {
        value: 30,
        message: 'Максимальное кол-во символов - 30',
      },
    },
  },
  {
    name: 'second_name',
    type: 'text',
    label: 'Фамилия',
    placeholder: 'Напишите вашу фамилию',
    rules: {
      required: 'Фамилия обязательна для заполнения',
      minLength: {
        value: 2,
        message: 'Минимальное кол-во символов - 2',
      },
      maxLength: {
        value: 40,
        message: 'Максимальное кол-во символов - 40',
      },
    },
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Телефон',
    placeholder: 'Укажите ваш номер телефона',
    rules: {
      required: 'Телефон обязателен для заполнения',
      minLength: {
        value: 2,
        message: 'Минимальное кол-во символов - 2',
      },
      maxLength: {
        value: 30,
        message: 'Максимальное кол-во символов - 30',
      },
    },
  },
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
      validate: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value) || 'Некорректный email';
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
      validate: (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return (
          regex.test(value) ||
          'Пароль должен содержать как минимум одну букву и одну цифру'
        );
      },
    },
  },
  {
    name: 'repeatPassword',
    type: 'password',
    label: 'Повторите пароль',
    placeholder: '12345678',
    rules: {
      required: 'Повторите пароль',
      minLength: {
        value: 6,
        message: 'Минимальное кол-во символов - 6',
      },
      maxLength: {
        value: 30,
        message: 'Максимальное кол-во символов - 30',
      },
      validate: (value, { password }) => {
        return value === password || 'Пароли должны совпадать';
      },
    },
  },
];
