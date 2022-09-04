import {ISession} from './ISession';
import {IStudent} from './IStudent';
import {IUser} from './IUser';

export interface IClassroom {
  _id: string;
  name: string;
  form_tutor: IUser;
  students: IStudent[];
  session: ISession;
  year_group: '7' | '8' | '9' | '10' | '11' | '12' | 'ify';
  section?: 'junior' | 'senior' | 'ify';
}
