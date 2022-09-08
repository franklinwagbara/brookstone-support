import Joi from 'joi';
import {ISubject} from '../interfaces';

export const validateSubjectUpdate = (subject: ISubject) => {
  const schema = Joi.object<ISubject>({
    name: Joi.string(),
  });

  return schema.validate(subject, {abortEarly: false});
};
