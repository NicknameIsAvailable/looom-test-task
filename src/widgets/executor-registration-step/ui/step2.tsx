import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useExecutorStore } from '@/entities/executor';
import { Button } from '@/shared/ui/button';
import { Textarea } from '@/shared/ui/textarea';

type FormData = {
  about_executor: string;
};

export const Step2: React.FC = () => {
  const { data, setData, nextStep, previousStep } = useExecutorStore();
  const { register, handleSubmit, formState, watch } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      about_executor: data.about_executor,
    },
  });

  const { isValid } = formState;

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const newData = { ...data, about_executor: formData.about_executor };
    setData(newData);
    nextStep();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e);
      }}
    >
      <div className='flex flex-col gap-[10px]'>
        <Textarea
          className='resize-none'
          rows={4}
          {...register('about_executor', { required: true, minLength: 150 })}
          placeholder='Немного слов о своей компании'
        />
        {watch('about_executor')?.length <= 150 && (
          <span className='text-right text-muted-foreground'>
            Минимум 150 символов
          </span>
        )}
      </div>
      <div className='flex justify-between mt-8'>
        <Button type='button' onClick={previousStep} variant='outline'>
          Назад
        </Button>
        <Button type='submit' disabled={!isValid}>
          Далее
        </Button>
      </div>
    </form>
  );
};
