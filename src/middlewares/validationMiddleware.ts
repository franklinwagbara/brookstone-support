import {NextFunction} from 'express';
import {ValidationResult} from 'joi';
import {HttpException} from '../exceptions';
import {IRequest, IResponse} from '../interfaces';
import {extractJoiErrors} from '../utils';
import {
  validateClassroom,
  validateClassroomUpdate,
  validateEnrollment,
  validateEnrollmentUpdate,
  validateLogin,
  validateRegister,
  validateSession,
  validateSessionUpdate,
  validateStudent,
  validateStudentUpdate,
  validateSubject,
  validateSubjectUpdate,
  validateTranscript,
  validateTranscriptUpdate,
  validateUser,
  validateUserUpdate,
  validateYearGroup,
  validateYearGroupUpdate,
  validateClassroomEnrollment,
  validateClassroomEnrollmentUpdate,
  validateBehaviour,
  validateBoardingHouse,
  validateBoardingHouseUpdate,
  validateBoardingEnrollment,
  validateBoardingEnrollmentUpdate,
} from '../validations';
import {validateBehaviourUpdate} from '../validations/validateBehaviourUpdate';

export const validationMiddleware = (type: string) => {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    let result: ValidationResult | null = null;
    if (type === 'user') result = validateRegister(req.body);
    else if (type === 'register') result = validateRegister(req.body);
    else if (type === 'login') result = validateLogin(req.body);
    else if (type === 'updateUser') result = validateUserUpdate(req.body);
    else if (type === 'session') result = validateSession(req.body);
    else if (type === 'sessionUpdate') result = validateSessionUpdate(req.body);
    else if (type === 'subject') result = validateSubject(req.body);
    else if (type === 'subjectUpdate') result = validateSubjectUpdate(req.body);
    else if (type === 'student') result = validateStudent(req.body);
    else if (type === 'studentUpdate') result = validateStudentUpdate(req.body);
    else if (type === 'transcript') result = validateTranscript(req.body);
    else if (type === 'transcriptUpdate')
      result = validateTranscriptUpdate(req.body);
    else if (type === 'behaviour') result = validateBehaviour(req.body);
    else if (type === 'behaviourUpdate')
      result = validateBehaviourUpdate(req.body);
    else if (type === 'classroom') result = validateClassroom(req.body);
    else if (type === 'classroomUpdate')
      result = validateClassroomUpdate(req.body);
    else if (type === 'enrollment') result = validateEnrollment(req.body);
    else if (type === 'enrollmentUpdate')
      result = validateEnrollmentUpdate(req.body);
    else if (type === 'classroomEnrollment')
      result = validateClassroomEnrollment(req.body);
    else if (type === 'classroomEnrollmentUpdate')
      result = validateClassroomEnrollmentUpdate(req.body);
    else if (type === 'boardingHouse') result = validateBoardingHouse(req.body);
    else if (type === 'boardingHouseUpdate')
      result = validateBoardingHouseUpdate(req.body);
    else if (type === 'boardingEnrollment')
      result = validateBoardingEnrollment(req.body);
    else if (type === 'boardingEnrollmentUpdate')
      result = validateBoardingEnrollmentUpdate(req.body);
    else if (type === 'yearGroup') result = validateYearGroup(req.body);
    else if (type === 'yearGroupUpdate')
      result = validateYearGroupUpdate(req.body);
    else next(new HttpException('Wrong input fields.', 400));

    if (!result?.error) return next();
    else next(new HttpException(extractJoiErrors(result.error), 400));
  };
};
