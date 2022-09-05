import Joi from 'joi';
import {ISubject} from '../interfaces';

export const validateSubject = (subject: ISubject) => {
  const schema = Joi.object<ISubject>({
    name: Joi.string().required(),
  });

  return schema.validate(subject, {abortEarly: false});
};
