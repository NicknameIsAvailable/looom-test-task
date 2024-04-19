import React, { ReactNode } from 'react';
import { ExecutorLayout } from '@/views/executor';

const Layout = ({ children }: { children: ReactNode }) => {
  return <ExecutorLayout>{children}</ExecutorLayout>;
};

export default Layout;
