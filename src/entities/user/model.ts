export interface UserData {
  first_name: string;
  second_name: string;
  phone: string;
  email: string;
  password: string;
  city: string;
  avatar?: string;
  role: 'executor' | 'customer';
}

export type UserState = {
  data: UserData;
  temporaryRole: 'executor' | 'customer';
};

export type UserActions = {
  changeRole: (value: 'executor' | 'customer') => void;
  changeTemporaryRole: (value: 'executor' | 'customer') => void;
  register: (data: UserData) => void;
  login: (data: { email: string; password: string }) => void;
  setAvatar: (avatar: string) => void;
};

export type UserStore = UserState & UserActions;

export const initData: UserData = {
  first_name: '',
  second_name: '',
  phone: '',
  email: '',
  password: '',
  city: '',
  role: 'customer',
};
