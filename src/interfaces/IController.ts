import express, {NextFunction} from 'express';
import {IRequest} from './IRequest';
import {IResponse} from './IResponse';

export interface IController<T> {
  router: express.Router;
  getMany: (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ) => Promise<void | IResponse>;
  getOne: (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ) => Promise<void | IResponse>;
  save: (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ) => Promise<void | IResponse>;
  update: (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ) => Promise<void | IResponse>;
  delete: (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ) => Promise<void | IResponse>;
}
