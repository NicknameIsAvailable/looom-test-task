'use client';

import { useEffect } from 'react';
import { executorRegistrationSteps } from '@/widgets/executor-registration-step';
import { useExecutorStore } from '@/entities/executor';

export const ExecutorRegistrationPage = () => {
  const { currentStep, steps, setSteps } = useExecutorStore();

  useEffect(() => {
    setSteps(executorRegistrationSteps);
  }, []);

  if (steps.length > 0) return steps[currentStep].view;
};
