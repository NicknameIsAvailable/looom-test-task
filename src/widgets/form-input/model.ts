import { UseFormReturn } from 'react-hook-form';
import { FormInputData } from '@/shared';

export interface FormInputProps {
  field: FormInputData<any>;
  methods: UseFormReturn<any>;
}

export interface PasswordInputProps {
  field: FormInputData<any>;
}
