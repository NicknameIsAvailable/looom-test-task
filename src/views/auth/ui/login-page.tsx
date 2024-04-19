'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '@/widgets/form-input';
import { useUserStore } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Checkbox } from '@/shared/ui/checkbox';
import { Form } from '@/shared/ui/form';
import Logo from '/public/logo.png';
import { useToast } from '@/shared/ui/use-toast';
import { loginFields, LoginInputs } from '../model';

export const LoginPage = () => {
  const { changeRole, data, login } = useUserStore();
  const userData = data;
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const { toast } = useToast();

  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const isValid = await methods.trigger();

    if (!isValid) {
      toast({
        variant: 'destructive',
        title: 'Ошибка',
        description: '',
      });
    } else {
      const newData = {
        ...userData,
        data,
      };

      login(newData);
      toast({
        title: 'Вы авторизовались!',
        description: '',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col gap-10'>
        <Card className='w-96 px-10 py-14 box-border flex flex-col gap-8'>
          <div className='flex flex-col gap-6'>
            <Image src={Logo} alt='Logo' className='mx-auto' />
            <h1 className='font-semibold text-3xl text-center'>Вход</h1>
          </div>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className='flex flex-col gap-6'
            >
              <div className='flex flex-col gap-5'>
                {loginFields.map((field) => (
                  <FormInput key={field.name} field={field} methods={methods} />
                ))}
              </div>
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='rememberMe'
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <label
                    htmlFor='rememberMe'
                    className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Запомнить меня
                  </label>
                </div>
                <Link
                  href='/auth/forget-password'
                  className='text-blue-600 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Забыли пароль
                </Link>
              </div>
            </form>
            <Button
              size='lg'
              type='submit'
              disabled={!methods.formState.isValid}
            >
              Продолжить
            </Button>
          </Form>
          <p className='text-center text-muted-foreground font-normal'>
            Нет аккаунта?{' '}
            <Link href='/auth/role' className='text-blue-600'>
              Зарегистрироваться
            </Link>
          </p>
        </Card>

        <div className='w-96 flex justify-around'>
          <Link
            onClick={() => changeRole('customer')}
            href='/auth/register'
            className='text-blue-600 text-opacity-30'
          >
            Как заказчик
          </Link>
          <Link
            onClick={() => changeRole('executor')}
            href='/auth/register'
            className='text-blue-600 text-opacity-30'
          >
            Как исполнитель
          </Link>
        </div>
      </div>
    </FormProvider>
  );
};
