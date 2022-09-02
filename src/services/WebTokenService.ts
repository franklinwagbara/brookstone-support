import jwt from 'jsonwebtoken';
import {IQuery, ITokenData, IUser} from '../interfaces';

export class WebTokenService {
  private _token: string | null;

  constructor() {
    this._token = null;
  }

  public get token() {
    return this._token;
  }

  public signToken(
    payload: ITokenData<IUser>,
    expiresIn?: string | number,
    secret?: string
  ) {
    this._token = jwt.sign(
      payload,
      secret || (process.env.JWT_SECRET as jwt.Secret),
      {expiresIn: expiresIn ?? '3d'}
    );

    return this._token;
  }

  public verifyToken = (token: string, secret?: string) => {
    return jwt.verify(token, secret || (process.env.JWT_SECRET as jwt.Secret));
  };
}
