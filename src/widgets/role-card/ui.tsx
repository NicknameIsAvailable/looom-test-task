'use client';

import Image from 'next/image';
import React, { FC } from 'react';
import { useUserStore } from '@/entities/user';
import { cn } from '@/shared/lib';
import { Card } from '@/shared/ui/card';
import { RoleCardProps } from './model';

export const RoleCard: FC<RoleCardProps> = ({ data }) => {
  const { temporaryRole, changeTemporaryRole } = useUserStore();

  const handleClick = () => {
    changeTemporaryRole(data.value);
  };

  return (
    <div key={data.name} onClick={handleClick} className='cursor-pointer'>
      <Card
        className={cn(
          temporaryRole === data.value ? 'border-primary' : 'border-muted',
          'bg-muted px-5 py-[10px]',
        )}
      >
        <div className='mx-auto w-32 h-32 flex justify-center items-center'>
          <Image src={data.icon} alt={data.name} />
        </div>
        <h3 className='text-center text-lg font-semibold leading-[38px]'>
          {data.name}
        </h3>
      </Card>
      <p className='mt-3 text-center text-muted-foreground text-base font-normal leading-normal'>
        {data.description}
      </p>
    </div>
  );
};
