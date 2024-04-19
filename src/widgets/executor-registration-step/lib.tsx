import { ExecutorRegistrationStep } from '@/entities/executor';
import { Step1, Step2, Step3, Step4 } from './ui';

export const executorRegistrationSteps: ExecutorRegistrationStep[] = [
  {
    title: 'Как называется ваша компания?',
    description:
      'Напишите название компании, по которому люди будут вас узнавать ',
    view: <Step1 />,
  },
  {
    title: 'Расскажите немного о себе',
    description: 'Напишите чем вы занимаетесь, какой у вас опыт, чем гордитесь',
    view: <Step2 />,
  },
  {
    title: 'Покажите себя',
    description: 'Добавьте фото своего профиля, чтобы быть узнаваемыми ',
    view: <Step3 />,
  },
  {
    title: 'Продукция, с которой вы работаете',
    description:
      'Укажите как минимум один вид продукции с которой вы работаете. Это позволит нам подбирать для вас интересные задания.',
    view: <Step4 />,
  },
];
