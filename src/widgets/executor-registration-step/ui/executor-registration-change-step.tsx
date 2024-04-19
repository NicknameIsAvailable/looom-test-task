'use client';

import React, { FC } from 'react';
import { useExecutorStore } from '@/entities/executor';
import { cn } from '@/shared';
import { Button } from '@/shared/ui/button';
import { ExecutorRegistrationChangeStepProps } from '../model';

export const ExecutorRegistrationChangeStep: FC<
  ExecutorRegistrationChangeStepProps
> = ({ isValid }) => {
  const { currentStep, steps, previousStep, nextStep } = useExecutorStore();

  return (
    <div
      className={cn(
        'flex',
        currentStep !== 0 ? 'justify-between' : 'justify-end',
      )}
    >
      {currentStep !== 0 && (
        <Button onClick={previousStep} variant='outline'>
          Назад
        </Button>
      )}
      {currentStep + 1 !== steps.length ? (
        <Button disabled={isValid} onClick={nextStep}>
          Далее
        </Button>
      ) : (
        <Button onClick={nextStep}>Завершить</Button>
      )}
    </div>
  );
};
