import {ISession} from './ISession';

export interface IYearGroup {
  _id?: string;
  year: '7' | '8' | '9' | '10' | '11' | '12' | 'ify';
  session: ISession;
}
