import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  IClassroom,
} from '../interfaces';
import {ClassroomModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class ClassroomService implements IService<IClassroom> {
  private readonly _repository: IRepository<IClassroom>;

  constructor(repository?: IRepository<IClassroom>) {
    this._repository =
      repository ?? new MongoDbRepository<IClassroom>(ClassroomModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IClassroom>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IClassroom>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Classroom does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: IClassroom): Promise<IResult<IClassroom>> {
    if (await this.isExist({name: data.name}))
      throw new AlreadyExistException('Classroom already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IClassroom
  ): Promise<IResult<IClassroom>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IClassroom>> {
    return await this._repository.delete(query);
  }
}
