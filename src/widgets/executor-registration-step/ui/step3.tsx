import Image from 'next/image';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { useForm } from 'react-hook-form';
import { useExecutorStore } from '@/entities/executor';
import { useUserStore } from '@/entities/user';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import ChooseAvatarIcon from '/public/images/choose-avatar.svg';
import { useToast } from '@/shared/ui/use-toast';

type FormData = {
  profile_picture: string;
};

export const Step3: React.FC = () => {
  const { nextStep, previousStep } = useExecutorStore();
  const user = useUserStore();
  const { register, handleSubmit, formState } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      profile_picture: user.data.avatar,
    },
  });
  const { errors, isValid } = formState;
  const [image, setImage] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const { toast } = useToast();

  const saveImage = () => {
    if (editorRef.current && image) {
      const canvas = editorRef.current.getImage();
      const editedImage = canvas.toDataURL();
      setImage(editedImage);
    }
  };

  const onSubmit = () => {
    user.setAvatar(image || '');
    nextStep();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const selectedImage = files[0];
      if (selectedImage.size <= 2 * 1024 * 1024) {
        const allowedTypes = ['image/webp', 'image/jpeg', 'image/png'];
        if (allowedTypes.includes(selectedImage.type)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result as string);
          };
          reader.readAsDataURL(selectedImage);
        } else {
          toast({
            variant: 'destructive',
            title: 'Не подходящий формат файла!',
            description: 'Можно использовать только: png, jpeg, webp',
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Файл слишком большой!',
          description: 'Максимальный размер файла: 2мб',
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid w-full max-w-sm items-center gap-1.5'>
        <Card className=' border-dashed max-w-60 max-h-60 rounded-full flex justify-center items-center'>
          <Image
            className='rounded-full h-full w-full'
            src={user.data.avatar || image || ChooseAvatarIcon}
            width={250}
            height={250}
            alt='Выбрать аватар'
          />
        </Card>
        <Dialog>
          <DialogTrigger>
            <Input
              {...register('profile_picture')}
              id='profile_picture'
              type='file'
              className='w-60 mt-4'
              accept='image/webp,image/jpeg,image/png'
              onChange={handleImageChange}
            />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактирование фото</DialogTitle>
            </DialogHeader>
            {image && (
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={250}
                height={250}
                border={50}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={0}
                borderRadius={125}
              />
            )}
            <DialogClose>
              <Button onClick={saveImage}>Сохранить</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
      {errors.profile_picture && (
        <span className='text-red-500'>Ошибка загрузки изображения</span>
      )}
      <div className='flex justify-between mt-8'>
        <Button type='button' onClick={previousStep} variant='outline'>
          Назад
        </Button>
        <Button type='submit' disabled={!image || !isValid} onClick={onSubmit}>
          Далее
        </Button>
      </div>
    </form>
  );
};
