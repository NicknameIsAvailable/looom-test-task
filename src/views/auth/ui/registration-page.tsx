'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FormInput } from '@/widgets/form-input';
import { UserData, useUserStore } from '@/entities/user';
import { cities } from '@/shared';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Checkbox } from '@/shared/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/ui/form';
import Logo from '/public/logo.png';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { useToast } from '@/shared/ui/use-toast';
import { registrationFields, RegistrationInputs } from '../model';

export const RegistrationPage = () => {
  const user = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const router = useRouter();

  const methods = useForm<RegistrationInputs>({
    defaultValues: {
      first_name: '',
      second_name: '',
      phone: '',
      email: '',
      city: '',
      password: '',
      repeatPassword: '',
    },
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<RegistrationInputs> = async (data) => {
    const isValid = await methods.trigger();

    if (!isValid) {
      toast({
        title: 'Не удалось зарегистрироваться',
      });
    } else {
      setLoading(true);
      const newData: UserData = {
        first_name: data.first_name,
        second_name: data.second_name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        city: data.city,
        role: user.data.role,
      };
      user.register(newData);
      setLoading(false);
      toast({
        title: 'Вы зарегистрировались',
      });
      if (user.data.role === 'executor')
        router.replace('/auth/register/executor');
    }
  };

  return (
    <FormProvider {...methods}>
      <Card className='px-10 py-14 box-border flex flex-col gap-8 max-w-xl'>
        <div className='flex flex-col gap-6'>
          <Image src={Logo} alt='Logo' className='mx-auto' />
          <h1 className='font-semibold text-3xl text-center'>
            {user.data.role === 'executor'
              ? 'Регистрация исполнителя'
              : 'Регистрация'}
          </h1>
          <p className='text-center text-gray-500 text-base font-normal leading-normal'>
            Пожалуйста, заполните необходимые поля
          </p>
        </div>
        <Form {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='flex flex-col gap-6'
          >
            <div className='grid xl:grid-cols-2 gap-x-5 gap-y-[10px]'>
              {registrationFields.map((field) => (
                <FormInput field={field} key={field.name} methods={methods} />
              ))}
            </div>
            <p className='text-muted-foreground text-xs font-normal leading-tight'>
              Пароль должен содержать одну большую букву, одну цифру и не менее
              12 символов
            </p>
            <FormField
              control={methods.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormLabel />
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className='w-full'>
                        <FormLabel>Город</FormLabel>
                        <SelectValue placeholder='Укажите город' />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex justify-between items-center'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='rememberMe'
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label
                  htmlFor='rememberMe'
                  className='text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Регистрируясь, вы принимаете наши Условия. Прочитайте Политику
                  использования данных и согласитесь с ней.
                  <Link
                    href='/auth/forget-password'
                    className='text-blue-600 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {' '}
                    Политика использования персональных данных
                  </Link>
                </label>
              </div>
            </div>
            <Button
              type='submit'
              disabled={!methods.formState.isValid && !isChecked}
            >
              {!loading ? (
                'Продолжить'
              ) : (
                <>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                </>
              )}
            </Button>
          </form>
        </Form>
        <p className='text-center text-muted-foreground font-normal mt-3'>
          Уже есть аккаунт?{' '}
          <Link href='/auth/login' className='text-blue-600'>
            Войдите
          </Link>
        </p>
      </Card>
    </FormProvider>
  );
};
