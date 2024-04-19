import { create } from 'zustand';
import {
  ExecutorData,
  ExecutorRegistrationStep,
  ExecutorStore,
  initData,
} from './model';

export const useExecutorStore = create<ExecutorStore>((set) => ({
  data: initData,
  currentStep: 0,
  steps: [],
  setData: (data: ExecutorData) => set({ data }),
  setSteps: (steps: ExecutorRegistrationStep[]) => set({ steps }),
  addTag: (tag: string) =>
    set((state) => ({
      data: { ...state.data, product_tag: [...state.data.product_tag, tag] },
    })),
  removeTag: (tag: string) =>
    set((state) => ({
      data: {
        ...state.data,
        product_tag: state.data.product_tag.filter((item) => item !== tag),
      },
    })),
  nextStep: () =>
    set((state) =>
      state.currentStep < state.steps.length - 1
        ? { currentStep: state.currentStep + 1 }
        : state,
    ),
  previousStep: () =>
    set((state) =>
      state.currentStep > 0 ? { currentStep: state.currentStep - 1 } : state,
    ),
}));
