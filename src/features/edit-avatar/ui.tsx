'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import React, { useRef, useState } from 'react';
import PlusCircle from '/public/icons/plus-circle.svg';
import AvatarEditor from 'react-avatar-editor';
import { useToast } from '@/shared/ui/use-toast';
import { Button } from '@/shared/ui/button';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useUserStore } from '@/entities/user';
import { Card } from '@/shared/ui/card';
import { EditAvatarFormData } from './lib';

export const EditAvatar = () => {
  const { toast } = useToast();
  const user = useUserStore();
  const { register, handleSubmit, formState } = useForm<EditAvatarFormData>({
    mode: 'onChange',
    defaultValues: {
      profile_picture: user.data.avatar,
    },
  });
  const [image, setImage] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);
  const { errors } = formState;

  const saveImage = () => {
    if (editorRef.current && image) {
      const canvas = editorRef.current.getImage();
      const editedImage = canvas.toDataURL();
      setImage(editedImage);
    }
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

  const onSubmit: SubmitHandler<EditAvatarFormData> = (formData) => {
    if (formData.profile_picture) {
      if (editorRef.current) {
        const canvas = editorRef.current.getImage();
        const editedImage = canvas.toDataURL();
        user.setAvatar(editedImage);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className='max-w-60'>
          <Button variant='ghost'>
            <Image src={PlusCircle} alt='+' className='mr-[10px]' />
            Добавить фото
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Редактирование фото</DialogTitle>
          </DialogHeader>
          <Card className='h-80 w-full flex justify-center items-center mt-4 border-dashed'>
            {image && (
              <AvatarEditor
                ref={editorRef}
                image={image}
                width={225}
                height={225}
                border={50}
                color={[255, 255, 255, 0.6]}
                scale={1.2}
                rotate={0}
                borderRadius={125}
              />
            )}
          </Card>
          {errors.profile_picture && (
            <span className='text-red-500'>Ошибка загрузки изображения</span>
          )}
          <DialogFooter className='flex items-center justify-center mt-4'>
            <Input
              {...register('profile_picture')}
              id='profile_picture'
              type='file'
              className='w-60 flex-1'
              accept='image/webp,image/jpeg,image/png'
              onChange={handleImageChange}
            />
            <DialogClose>
              <Button type='submit' onClick={saveImage}>
                {image ? 'Сохранить' : 'Отмена'}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
