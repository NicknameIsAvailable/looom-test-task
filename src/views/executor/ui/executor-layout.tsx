'use client';

import Image from 'next/image';
import React, { ReactNode } from 'react';
import CustomerImage from '/public/images/gallery.png';
import Logo from '/public/logo.png';
import {
  ExecutorRegistrationStepCounter,
  ExecutorRegistrationStepDescription,
} from '@/widgets/executor-registration';
import { useExecutorStore } from '@/entities/executor';
import { useUserStore } from '@/entities/user';

export const ExecutorLayout = ({ children }: { children: ReactNode }) => {
  const { data } = useExecutorStore();
  const user = useUserStore();

  return (
    <main className='grid grid-cols-2 w-screen overflow-hidden max-h-screen'>
      <div className='w-full h-full overflow-hidden'>
        <Image src={CustomerImage} alt='Галерея' />
      </div>
      <div className='w-full h-full container flex flex-col gap-10 justify-center max-h-screen'>
        <ExecutorRegistrationStepCounter />
        <Image src={Logo} alt='Лого' />
        <ExecutorRegistrationStepDescription />
        {children}
      </div>
    </main>
  );
};
