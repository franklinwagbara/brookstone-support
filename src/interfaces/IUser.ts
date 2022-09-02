export interface IUser {
  username: string;
  email: string;
  role?: string;
  password?: string;
  confirm_password?: string;
  type?: 'user';
}
