import Joi from 'joi';
import {IStudent} from '../interfaces';

export const validateStudent = (student: IStudent) => {
  const schema = Joi.object<IStudent>({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    other_names: Joi.string().allow(''),
    gender: Joi.string().required(),
    session: Joi.string().required(),
    classroom: Joi.string().required(),
    year_group: Joi.string().required(),
    dob: Joi.string().allow(''),
    photo: Joi.string().allow(''),
  });

  return schema.validate(student, {abortEarly: false});
};
