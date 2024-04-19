'use client';

import React, { createContext, ReactNode } from 'react';
import { useExecutorStore } from './lib';
import { ExecutorState } from './model';

const ExecutorContext = createContext<ExecutorState | undefined>(undefined);

export const ExecutorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const executorStore = useExecutorStore();

  return (
    <ExecutorContext.Provider value={executorStore}>
      {children}
    </ExecutorContext.Provider>
  );
};
