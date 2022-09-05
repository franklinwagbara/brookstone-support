import Joi from 'joi';
import {ISession} from '../interfaces';

export const validateSession = (session: ISession) => {
  const schema = Joi.object<ISession>({
    session: Joi.string().required(),
    term: Joi.string().required(),
  });

  return schema.validate(session, {abortEarly: false});
};
