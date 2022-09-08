import Joi from 'joi';
import {IEnrollment} from '../interfaces';

export const validateEnrollmentUpdate = (enrollment: IEnrollment) => {
  const schema = Joi.object<IEnrollment>({
    student: Joi.string(),
    subject: Joi.string(),
    session: Joi.string(),
    teacher: Joi.string(),
    classroom: Joi.string(),
    transcript: Joi.string(),
  });

  return schema.validate(enrollment, {abortEarly: false});
};
