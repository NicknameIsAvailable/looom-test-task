import { ReactNode } from 'react';

export interface ExecutorData {
  user_id: string;
  company_name: string;
  about_executor: string;
  product_tag: string[];
}

export interface ExecutorRegistrationStep {
  title: string;
  description: string;
  view: ReactNode;
}

export interface ExecutorState {
  data: ExecutorData;
  currentStep: number;
  steps: ExecutorRegistrationStep[];
}

export interface ExecutorActions {
  setData: (data: ExecutorData) => void;
  setSteps: (steps: ExecutorRegistrationStep[]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  nextStep: () => void;
  previousStep: () => void;
}

export type ExecutorStore = ExecutorState & ExecutorActions;

export const initData: ExecutorData = {
  user_id: '',
  company_name: '',
  about_executor: '',
  product_tag: [],
};
