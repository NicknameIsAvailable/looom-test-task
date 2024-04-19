'use client';

import React, { createContext, ReactNode } from 'react';
import { useUserStore } from './lib';
import { UserState } from './model';

const UserContext = createContext<UserState | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const userStore = useUserStore();

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};
