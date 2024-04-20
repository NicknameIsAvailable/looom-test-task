import Image from 'next/image';
import React from 'react';
import { useExecutorStore } from '@/entities/executor';
import { useUserStore } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import ChooseAvatarIcon from '/public/images/choose-avatar.svg';
import { EditAvatar } from '@/features/edit-avatar';

export const Step3: React.FC = () => {
  const { nextStep, previousStep } = useExecutorStore();
  const user = useUserStore();

  return (
    <div>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Card className=' border-dashed w-60 h-60 rounded-full flex justify-center items-center'>
          <Image
            className='rounded-full'
            src={user.data.avatar || ChooseAvatarIcon}
            width={user.data.avatar ? 250 : 112}
            height={user.data.avatar ? 250 : 112}
            alt='Выбрать аватар'
          />
        </Card>
        <EditAvatar />
      </div>
      <div className='flex justify-between mt-8'>
        <Button type='button' onClick={previousStep} variant='outline'>
          Назад
        </Button>
        <Button type='submit' disabled={!user.data.avatar} onClick={nextStep}>
          Далее
        </Button>
      </div>
    </div>
  );
};
