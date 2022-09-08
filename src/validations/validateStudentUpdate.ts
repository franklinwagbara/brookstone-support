import Joi from 'joi';
import {IStudent} from '../interfaces';

export const validateStudentUpdate = (student: IStudent) => {
  const schema = Joi.object<IStudent>({
    first_name: Joi.string(),
    last_name: Joi.string(),
    other_names: Joi.string(),
    gender: Joi.string(),
    session: Joi.string(),
    year_group: Joi.string(),
    dob: Joi.string(),
    photo: Joi.string(),
  });

  return schema.validate(student, {abortEarly: false});
};
