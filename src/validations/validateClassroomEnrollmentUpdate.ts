import Joi from 'joi';
import {IClassroomEnrollment} from '../interfaces';

export const validateClassroomEnrollmentUpdate = (
  classroomEnrollment: IClassroomEnrollment
) => {
  const schema = Joi.object<IClassroomEnrollment>({
    student: Joi.string().required(),
    session: Joi.string().required(),
    classroom: Joi.string().required(),
    week_1_comment: Joi.string().allow(['', ' ']),
    week_2_comment: Joi.string().allow(['', ' ']),
    week_3_comment: Joi.string().allow(['', ' ']),
    week_4_comment: Joi.string().allow(['', ' ']),
    week_5_comment: Joi.string().allow(['', ' ']),
    week_6_comment: Joi.string().allow(['', ' ']),
    week_7_comment: Joi.string().allow(['', ' ']),
    week_8_comment: Joi.string().allow(['', ' ']),
    week_9_comment: Joi.string().allow(['', ' ']),
    half_term_comment: Joi.string().allow(['', ' ']),
    end_of_term_comment: Joi.string().allow(['', ' ']),
  });

  return schema.validate(classroomEnrollment, {abortEarly: false});
};
