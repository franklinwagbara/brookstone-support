import {NextFunction} from 'express';
import {
  AuthenticationTokenMissingException,
  InvalidAuthenticationTokenException,
} from '../exceptions';
import {IQuery, IRequest, IResponse, ITokenData, IUser} from '../interfaces';
import {UserModel} from '../models';
import {MongoDbRepository} from '../repositories';
import {WebTokenService} from '../services';

export const authenticationMiddlewware = async (
  req: IRequest,
  res: IResponse,
  next: NextFunction
) => {
  const wts = new WebTokenService();
  const token = req.cookies['access-token']();
  const repo = new MongoDbRepository<IUser>(UserModel);

  if (!token) next(new AuthenticationTokenMissingException());

  const {data} = wts.verifyToken(token) as ITokenData<IUser>;
  const user = (await repo.getOne({email: data.email} as IQuery)).data as IUser;

  if (user) {
    req.user = user;
    next();
  } else {
    next(new InvalidAuthenticationTokenException());
  }
};
