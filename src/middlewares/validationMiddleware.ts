import {NextFunction} from 'express';
import {ValidationResult} from 'joi';
import {HttpException} from '../exceptions';
import {IRequest, IResponse} from '../interfaces';
import {extractJoiErrors} from '../utils';
import {
  validateLogin,
  validateRegister,
  validateUser,
  validateUserUpdate,
} from '../validations';

export const validationMiddleware = (type: string) => {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    let result: ValidationResult | null = null;
    if (type === 'user') result = validateUser(req.body);
    else if (type === 'register') result = validateRegister(req.body);
    else if (type === 'login') result = validateLogin(req.body);
    else if (type === 'updateUser') result = validateUserUpdate(req.body);
    else next(new HttpException('Wrong input fields.', 400));

    if (!result?.error) return next();
    else next(new HttpException(extractJoiErrors(result.error), 400));
  };
};
