import {IQuery, IRepository, IResult, IService, IUser} from '../interfaces';
import {UserModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class UserService implements IService<IUser> {
  private readonly _repository: IRepository<IUser>;

  constructor(repository?: IRepository<IUser>) {
    this._repository = repository ?? new MongoDbRepository(UserModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IUser>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IUser>> {
    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    throw new Error('Not implemented.');
  }
  public async save(data: IUser): Promise<IResult<IUser>> {
    return await this._repository.save(data);
  }
  public async update(query: IQuery, data: IUser): Promise<IResult<IUser>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IUser>> {
    return await this._repository.delete(query);
  }
}
