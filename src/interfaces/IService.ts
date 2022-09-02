import {Model, Query} from 'mongoose';
import {IResult, IQuery} from '../interfaces';

export interface IService<T> {
  getMany: (query: IQuery) => Promise<IResult<T>>;
  getOne: (query: IQuery) => Promise<IResult<T>>;
  isExist: (query: IQuery) => Promise<boolean>;
  save: (data: T) => Promise<IResult<T>>;
  update: (query: IQuery, data: T) => Promise<IResult<T>>;
  delete: (query: IQuery) => Promise<IResult<T>>;
}
