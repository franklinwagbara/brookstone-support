import Joi from 'joi';
import {IYearGroup} from '../interfaces';

export const validateYearGroup = (yearGroup: IYearGroup) => {
  const schema = Joi.object<IYearGroup>({
    year: Joi.string().required(),
    session: Joi.string().required(),
  });

  return schema.validate(yearGroup, {abortEarly: false});
};
