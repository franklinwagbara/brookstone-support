import {ISession} from './ISession';

export interface IStudent {
  _id: string;
  first_name: string;
  last_name: string;
  other_names: string;
  gender: 'male' | 'female';
  session: ISession;
  dob?: string;
  photo?: string;
}
