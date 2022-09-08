import Joi from 'joi';
import {ISession} from '../interfaces';

export const validateSessionUpdate = (session: ISession) => {
  const schema = Joi.object<ISession>({
    session: Joi.string(),
    term: Joi.string(),
    current: Joi.string(),
  });

  return schema.validate(session, {abortEarly: false});
};
