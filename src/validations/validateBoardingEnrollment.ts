import Joi from 'joi';
import {IBoardingEnrollment} from '../interfaces';

export const validateBoardingEnrollment = (
  boardingEnrollment: IBoardingEnrollment
) => {
  const schema = Joi.object<IBoardingEnrollment>({
    student: Joi.string().required(),
    session: Joi.string().required(),
    boarding_house: Joi.string().required(),
    week_1_comment: Joi.string().allow(''),
    week_2_comment: Joi.string().allow(''),
    week_3_comment: Joi.string().allow(''),
    week_4_comment: Joi.string().allow(''),
    week_5_comment: Joi.string().allow(''),
    week_6_comment: Joi.string().allow(''),
    week_7_comment: Joi.string().allow(''),
    week_8_comment: Joi.string().allow(''),
    week_9_comment: Joi.string().allow(''),
    half_term_comment: Joi.string().allow(''),
    end_of_term_comment: Joi.string().allow(''),
  });

  return schema.validate(boardingEnrollment, {abortEarly: false});
};
