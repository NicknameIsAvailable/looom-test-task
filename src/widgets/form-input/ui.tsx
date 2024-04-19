'use client';

import { EyeIcon } from 'lucide-react';
import React, { FC, useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Input } from '@/shared/ui/input';
import { FormInputProps, PasswordInputProps } from './model';

export const PasswordInput: FC<PasswordInputProps> = ({ field }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className='relative'>
      <Input
        type={visible ? 'text' : 'password'}
        placeholder={field.placeholder}
        className='w-full'
      />
      <Button
        onClick={() => setVisible(!visible)}
        className='absolute top-0 right-0'
        variant='ghost'
        size='icon'
      >
        <EyeIcon />
      </Button>
    </div>
  );
};

export const FormInput: FC<FormInputProps> = ({ field, methods }) => {
  return (
    <FormField
      control={methods.control}
      name={String(field.name)}
      render={() => (
        <FormItem className='grid w-full max-w-sm items-center gap-1.5'>
          <FormLabel className='font-medium'>{field.label}</FormLabel>
          <FormControl>
            {field.type === 'password' ? (
              <PasswordInput field={field} />
            ) : (
              <Input
                {...methods.register(String(field.name), field.rules)}
                type={field.type}
                placeholder={field.placeholder}
                className='w-full'
              />
            )}
          </FormControl>
          {methods.formState.errors[String(field.name)] && (
            <FormMessage>
              {String(methods.formState.errors[String(field.name)]?.message)}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};
