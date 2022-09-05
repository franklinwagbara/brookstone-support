import Joi from 'joi';
import {IEnrollment} from '../interfaces';

export const validateEnrollment = (enrollment: IEnrollment) => {
  const schema = Joi.object<IEnrollment>({
    subject: Joi.string().required(),
    session: Joi.string().required(),
    teacher: Joi.string().required(),
    classroom: Joi.string().required(),
    transcript: Joi.string().required(),
  });

  return schema.validate(enrollment, {abortEarly: false});
};
