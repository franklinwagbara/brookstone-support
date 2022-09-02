import {NextFunction} from 'express';
import {HttpException} from '../exceptions';
import {IRequest, IResponse, IResult} from '../interfaces';

export const errorHandlingMiddleware = (
  exception: HttpException,
  req: IRequest,
  res: IResponse,
  next: NextFunction
) => {
  res.status(exception.status).send({
    data: null,
    error: exception.message,
    status: exception.status,
  } as IResult<Error>);
};
