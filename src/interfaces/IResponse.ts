import {Response} from 'express';
import {IUser} from './IUser';

export interface IResponse extends Response {
  user?: IUser;
}
