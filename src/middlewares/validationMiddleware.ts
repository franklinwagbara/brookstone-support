import {NextFunction} from 'express';
import {ValidationResult} from 'joi';
import {HttpException} from '../exceptions';
import {IRequest, IResponse} from '../interfaces';
import {extractJoiErrors} from '../utils';
import {validateUser} from '../validations';

export const validationMiddleware = (type: string) => {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    let result: ValidationResult | null = null;
    if (type === 'user') result = validateUser(req.body);

    if (!result?.error) return next();
    else next(new HttpException(extractJoiErrors(result.error), 400));
  };
};
