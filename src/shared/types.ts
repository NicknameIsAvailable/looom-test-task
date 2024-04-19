import { StaticImageData } from 'next/image';
import { RegisterOptions } from 'react-hook-form';

export interface Role {
  icon: StaticImageData;
  value: 'executor' | 'customer';
  name: string;
  description: string;
}

export interface FormInputData<T> {
  name: keyof T;
  type: string;
  label: string;
  placeholder: string;
  rules: RegisterOptions;
}
