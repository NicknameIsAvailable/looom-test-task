import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Link href='/auth/login'>
        <Button>Авторизоваться</Button>
      </Link>
    </main>
  );
}
