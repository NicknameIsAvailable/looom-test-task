'use client';

import { ReloadIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Logo from '/public/logo.png';
import { RoleCard } from '@/widgets/role-card';
import { useUserStore } from '@/entities/user';
import { roles } from '@/shared';
import { Button } from '@/shared/ui/button';

export const ChooseRolePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { temporaryRole, changeRole } = useUserStore();

  const router = useRouter();

  const handleSubmit = () => {
    setLoading(true);
    changeRole(temporaryRole);
    setLoading(false);
    router.replace('/auth/register');
  };

  return (
    <div className='max-w-sm max-h-screen flex flex-col gap-6'>
      <Image src={Logo} alt='Logo' className='mx-auto' />
      <div>
        <h1 className='text-center text-gray-900 text-3xl font-semibold leading-[38px]'>
          Выбор роли
        </h1>
        <p className='text-center text-gray-500 text-base font-normal leading-normal'>
          Пожалуйста, выберете в роли кого вы хотите зарегистрироваться
        </p>
      </div>
      <div className='grid grid-cols-2 gap-[10px]'>
        {roles.map((role) => (
          <RoleCard key={role.name} data={role} />
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={!temporaryRole || loading}>
        {!loading ? (
          'Выберите роль'
        ) : (
          <>
            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
          </>
        )}
      </Button>
      <p className='text-center text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
        Уже есть аккаунт?
        <Link
          href='/auth/login'
          className='text-blue-600 text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {' '}
          Войдите
        </Link>
      </p>
    </div>
  );
};
