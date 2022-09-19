import Joi from 'joi';
import {IBoardingHouse} from '../interfaces';

export const validateBoardingHouse = (boardingHouse: IBoardingHouse) => {
  const schema = Joi.object<IBoardingHouse>({
    name: Joi.string().required(),
    boarding_parent: Joi.string().required(),
    students: Joi.array(),
    session: Joi.string().required(),
    year_group: Joi.string().required(),
    section: Joi.string(),
  });

  return schema.validate(boardingHouse, {abortEarly: false});
};
