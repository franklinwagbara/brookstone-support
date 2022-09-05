import {NextFunction} from 'express';
import {ValidationResult} from 'joi';
import {HttpException} from '../exceptions';
import {IRequest, IResponse} from '../interfaces';
import {extractJoiErrors} from '../utils';
import {
  validateClassroom,
  validateEnrollment,
  validateLogin,
  validateRegister,
  validateSession,
  validateStudent,
  validateSubject,
  validateTranscript,
  validateUser,
  validateUserUpdate,
  validateYearGroup,
} from '../validations';

export const validationMiddleware = (type: string) => {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    let result: ValidationResult | null = null;
    if (type === 'user') result = validateUser(req.body);
    else if (type === 'register') result = validateRegister(req.body);
    else if (type === 'login') result = validateLogin(req.body);
    else if (type === 'updateUser') result = validateUserUpdate(req.body);
    else if (type === 'session') result = validateSession(req.body);
    else if (type === 'subject') result = validateSubject(req.body);
    else if (type === 'student') result = validateStudent(req.body);
    else if (type === 'transcript') result = validateTranscript(req.body);
    else if (type === 'classroom') result = validateClassroom(req.body);
    else if (type === 'enrollment') result = validateEnrollment(req.body);
    else if (type === 'yearGroup') result = validateYearGroup(req.body);
    else next(new HttpException('Wrong input fields.', 400));

    if (!result?.error) return next();
    else next(new HttpException(extractJoiErrors(result.error), 400));
  };
};
