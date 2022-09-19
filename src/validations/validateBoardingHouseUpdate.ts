import Joi from 'joi';
import {IBoardingHouse} from '../interfaces';

export const validateBoardingHouseUpdate = (boardingHouse: IBoardingHouse) => {
  const schema = Joi.object<IBoardingHouse>({
    name: Joi.string(),
    boarding_parent: Joi.string(),
    students: Joi.array(),
    session: Joi.string(),
    year_group: Joi.string(),
    section: Joi.string(),
  });

  return schema.validate(boardingHouse, {abortEarly: false});
};
