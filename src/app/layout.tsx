import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ExecutorProvider } from '@/entities/executor';
import { UserProvider } from '@/entities/user';
import { Toaster } from '@/shared/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Loom test task',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <UserProvider>
        <ExecutorProvider>
          <body className={inter.className}>
            <Toaster />
            {children}
          </body>
        </ExecutorProvider>
      </UserProvider>
    </html>
  );
}
