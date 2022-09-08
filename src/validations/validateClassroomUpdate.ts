import Joi from 'joi';
import {IClassroom} from '../interfaces';

export const validateClassroomUpdate = (classroom: IClassroom) => {
  const schema = Joi.object<IClassroom>({
    name: Joi.string(),
    form_tutor: Joi.string(),
    students: Joi.array(),
    session: Joi.string(),
    year_group: Joi.string(),
    section: Joi.string(),
  });

  return schema.validate(classroom, {abortEarly: false});
};
