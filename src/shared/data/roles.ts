import { Role } from '../types';
import CustomerIcon from '/public/images/customer.png';
import ExecutorIcon from '/public/images/executor.png';

export const roles: Role[] = [
  {
    icon: CustomerIcon,
    value: 'customer',
    name: 'Заказчик',
    description: 'Хочу нанять исполнителя',
  },
  {
    icon: ExecutorIcon,
    value: 'executor',
    name: 'Исполнитель',
    description: 'Хочу выполнять задания и продавать свои услуги',
  },
];
