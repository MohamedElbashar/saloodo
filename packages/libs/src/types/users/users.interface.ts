import { BaseProps } from '../base';

type Role = 'Sender' | 'Biker';
export interface IUser extends BaseProps {
  userName: string;
  email: string;
  password: string;
  role: Role;
}
