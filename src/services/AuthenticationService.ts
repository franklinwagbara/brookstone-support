import bcrypt from 'bcrypt';
import _ from 'lodash';
import {Roles} from '../constants';
import {AuthenticationException, Exception} from '../exceptions';
import {IQuery, IRepository, ITokenData, IUser} from '../interfaces';
import {normalizeQuery} from '../utils';
import {UserService} from './UserService';
import {WebTokenService} from './WebTokenService';

export class AuthenticationService {
  private readonly _repository: IRepository<IUser>;

  constructor(repository?: IRepository<IUser>) {
    this._repository = repository ?? new UserService();
  }

  public async register(user: IUser) {
    const webToken = new WebTokenService();
    const query: IQuery = normalizeQuery({email: user.email});

    if (await this._repository.isExist(query))
      throw new AuthenticationException();

    user.password = await bcrypt.hash(user.password as string, 10);
    user.role = Roles.User;

    //save user
    user = _.pick(user, [
      'username',
      'email',
      'password',
      'lastname',
      'firstname',
      'role',
    ]);
    let {data} = await this._repository.save(user);

    //generate token
    const newUser = _.pick(data, [
      '_id',
      'username',
      'email',
      'password',
      'lastname',
      'firstname',
      'role',
    ]);
    const token = webToken.signToken({data: newUser} as ITokenData<IUser>);

    return {token, user: newUser};
  }

  public async login(user: IUser) {
    const webToken = new WebTokenService();
    const query: IQuery = normalizeQuery({email: user.email});

    if (!(await this._repository.isExist(query)))
      throw new AuthenticationException();

    let user_from_db = (await this._repository.getOne(query)).data as IUser;

    const passwordMatch = await bcrypt.compare(
      user.password as string,
      user_from_db.password as string
    );

    if (!passwordMatch) throw new AuthenticationException();

    user_from_db = _.pick(user_from_db, [
      '_id',
      'username',
      'email',
      'lastname',
      'firstname',
      'role',
    ]);
    const token = webToken.signToken({data: user_from_db});

    return {token, user: user_from_db};
  }
}
