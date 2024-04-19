import React from 'react';
import { useForm } from 'react-hook-form';
import { useExecutorStore } from '@/entities/executor';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

type FormData = {
  company_name: string;
};

export const Step1: React.FC = () => {
  const { data, setData, nextStep } = useExecutorStore();
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      company_name: data.company_name,
    },
  });

  const { errors, isValid } = formState;

  const onSubmit = (formData: FormData) => {
    const newData = { ...data, company_name: formData.company_name };
    setData(newData);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('company_name', { required: true, maxLength: 128 })}
        placeholder='Название вашей компании'
      />
      {errors.company_name && errors.company_name.type === 'maxLength' && (
        <span className='text-red-500'>
          Максимальное количество символов: 128
        </span>
      )}
      <div className='flex justify-end mt-8'>
        <Button type='submit' disabled={!isValid}>
          Далее
        </Button>
      </div>
    </form>
  );
};
