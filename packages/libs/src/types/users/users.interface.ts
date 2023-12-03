import { BaseProps } from '../base';

export interface IUser extends BaseProps {
  userName: string;
  email: string;
  password: string;
}
