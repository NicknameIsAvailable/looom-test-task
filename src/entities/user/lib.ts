import { create } from 'zustand';
import { initData, UserState, UserStore } from './model';

export const useUserStore = create<UserStore>((set) => ({
  data: initData,
  temporaryRole: 'customer',
  register: (data) => {
    const res: Promise<any> = fetch('/user-registration', {
      method: 'PUT',
      body: JSON.stringify({
        data,
      }),
    });

    set(() => ({ data }));
  },
  login: (data) => {
    const res: Promise<any> = fetch('/user-login', {
      method: 'PUT',
      body: JSON.stringify({
        data,
      }),
    });

    set((state) => ({ data: { ...state.data, data } }));
  },
  changeTemporaryRole: (value) =>
    set((state: UserState) => {
      return { ...state, temporaryRole: value };
    }),
  changeRole: (role) =>
    set((state: UserState) => {
      const updatedUser = { ...state.data, role: role };
      window.localStorage.setItem('role', role);
      return { data: updatedUser };
    }),
  setAvatar: (avatar) => {
    const res: Promise<any> = fetch('/user-add-photo', {
      method: 'PUT',
      body: JSON.stringify({
        avatar,
      }),
    });

    set((state) => ({ data: { ...state.data, avatar } }));
  },
}));
