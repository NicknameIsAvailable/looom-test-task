'use client';

import React from 'react';
import { useExecutorStore } from '@/entities/executor';

export const ExecutorRegistrationStepDescription = () => {
  const { currentStep, steps } = useExecutorStore();

  const data = steps[currentStep];

  return (
    <div className='flex flex-col gap-[10px]'>
      <h1 className='text-black text-3xl font-normal'>{data?.title}</h1>
      <p className='text-zinc-800 text-lg font-normal'>{data?.description}</p>
    </div>
  );
};
