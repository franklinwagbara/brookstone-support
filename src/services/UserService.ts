import bcrypt from 'bcrypt';
import {Roles} from '../constants';
import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {IQuery, IRepository, IResult, IService, IUser} from '../interfaces';
import {UserModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class UserService implements IService<IUser> {
  private readonly _repository: IRepository<IUser>;

  constructor(repository?: IRepository<IUser>) {
    this._repository = repository ?? new MongoDbRepository<IUser>(UserModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IUser>> {
    // if (!(await this.isExist(query)))
    //   throw new DoesNotExistException('User does not exist in the database.');

    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IUser>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException('User does not exist in the database.');
    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(user: IUser): Promise<IResult<IUser>> {
    if (await this.isExist({email: user.email}))
      throw new AlreadyExistException('User already exists');

    //hash password
    const hashedPassword = await bcrypt.hash(user.password as string, 10);

    //persist user
    user.password = hashedPassword;
    user.role = Roles.User;

    return await this._repository.save(user);
  }
  public async update(query: IQuery, data: IUser): Promise<IResult<IUser>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IUser>> {
    return await this._repository.delete(query);
  }
}
