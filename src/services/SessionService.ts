import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {IQuery, IRepository, IResult, IService, ISession} from '../interfaces';
import {SessionModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class SessionService implements IService<ISession> {
  private readonly _repository: IRepository<ISession>;

  constructor(repository?: IRepository<ISession>) {
    this._repository =
      repository ?? new MongoDbRepository<ISession>(SessionModel);
  }
  public async getMany(query: IQuery): Promise<IResult<ISession>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<ISession>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Session does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: ISession): Promise<IResult<ISession>> {
    if (await this.isExist({session: data.session, term: data.term}))
      throw new AlreadyExistException('Session already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: ISession
  ): Promise<IResult<ISession>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<ISession>> {
    return await this._repository.delete(query);
  }
}
