'use client';

import React from 'react';
import { useExecutorStore } from '@/entities/executor';

export const ExecutorRegistrationStepCounter = () => {
  const { currentStep, steps } = useExecutorStore();

  return (
    <h4 className='text-black text-4xl font-medium'>
      {currentStep + 1}/{steps.length}
    </h4>
  );
};
