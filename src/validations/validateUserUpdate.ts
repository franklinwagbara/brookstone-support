import Joi from 'joi';
import {IUser} from '../interfaces';

export const validateUserUpdate = (user: IUser) => {
  const schema = Joi.object<IUser>({
    username: Joi.string().alphanum().min(4).max(30).required(),
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: {allow: ['com', 'net', 'org', 'co']},
      })
      .required(),
    role: Joi.string(),
  });

  return schema.validate(user, {abortEarly: false});
};
