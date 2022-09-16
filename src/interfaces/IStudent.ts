import {IClassroom} from './IClassroom';
import {ISession} from './ISession';
import {IYearGroup} from './IYearGroup';

export interface IStudent {
  _id: string;
  first_name: string;
  last_name: string;
  other_names?: string;
  gender: 'Male' | 'Female';
  session: ISession;
  classroom: IClassroom;
  year_group: IYearGroup;
  dob?: string;
  photo?: string;
}
