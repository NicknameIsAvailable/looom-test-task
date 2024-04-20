'use client';

import { PlusIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useExecutorStore } from '@/entities/executor';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';

const popularTags = [
  'Толстовки',
  'Ветровки',
  'Бейсболки',
  'Куртки',
  'Рубашки-поло',
];

export const Step4: React.FC = () => {
  const [newTag, setNewTag] = useState<string>('');
  const { data, setData, nextStep, previousStep, addTag, removeTag } =
    useExecutorStore();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNewTag(value);
  };

  const handleAddTag = (tag: string) => {
    if (!data.product_tag.includes(tag)) addTag(tag);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.key === 'Enter' || event.key === ' ') && newTag.trim() !== '') {
      addTag(newTag.trim());
      setNewTag('');
    }

    if (event.key === 'Backspace' && newTag === '') {
      removeTag(data.product_tag[data.product_tag.length - 1]);
    }
  };

  return (
    <div>
      <Card className='p-[10px] flex flex-wrap gap-2 w-full max-h-24 overflow-auto'>
        {data.product_tag.map((tag) => (
          <Badge onClick={() => removeTag(tag)} variant='outline' key={tag}>
            {tag}
            <XIcon className='ml-[10px] h-4 w-4' />
          </Badge>
        ))}
        <Input
          value={newTag}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className='border-none bg-none h-6 max-w-52'
          placeholder='Начните вводить здесь...'
        />
      </Card>
      <div className='p-[10px] flex flex-wrap gap-2 w-full'>
        <span className='text-zinc-800 font-normal'>Популярное:</span>
        {popularTags.map((tag) => (
          <Badge
            onClick={() => handleAddTag(tag)}
            variant={data.product_tag.includes(tag) ? 'default' : 'outline'}
            key={tag}
          >
            {!data.product_tag.includes(tag) && (
              <PlusIcon className='mr-[10px] h-4 w-4' />
            )}
            {tag}
          </Badge>
        ))}
      </div>
      <div className='flex justify-between mt-8'>
        <Button type='submit' onClick={previousStep} variant='outline'>
          Назад
        </Button>
        <Button type='submit' onClick={nextStep}>
          Завершить
        </Button>
      </div>
    </div>
  );
};
