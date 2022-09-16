import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  IBehaviour,
} from '../interfaces';
import {BehaviourModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class BehaviourService implements IService<IBehaviour> {
  private readonly _repository: IRepository<IBehaviour>;

  constructor(repository?: IRepository<IBehaviour>) {
    this._repository =
      repository ?? new MongoDbRepository<IBehaviour>(BehaviourModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IBehaviour>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IBehaviour>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Student does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: IBehaviour): Promise<IResult<IBehaviour>> {
    if (
      await this.isExist({
        student: data.student.toString(),
        session: data.session.toString(),
      })
    )
      throw new AlreadyExistException('Student already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IBehaviour
  ): Promise<IResult<IBehaviour>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IBehaviour>> {
    return await this._repository.delete(query);
  }
}
