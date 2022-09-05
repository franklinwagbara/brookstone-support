import Joi from 'joi';
import {IClassroom} from '../interfaces';

export const validateClassroom = (classroom: IClassroom) => {
  const schema = Joi.object<IClassroom>({
    name: Joi.string().required(),
    form_tutor: Joi.string().required(),
    students: Joi.array(),
    session: Joi.string().required(),
    year_group: Joi.string().required(),
    section: Joi.string(),
  });

  return schema.validate(classroom, {abortEarly: false});
};
