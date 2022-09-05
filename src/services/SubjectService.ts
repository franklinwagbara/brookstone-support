import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {IQuery, IRepository, IResult, IService, ISubject} from '../interfaces';
import {SubjectModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class SubjectService implements IService<ISubject> {
  private readonly _repository: IRepository<ISubject>;

  constructor(repository?: IRepository<ISubject>) {
    this._repository =
      repository ?? new MongoDbRepository<ISubject>(SubjectModel);
  }
  public async getMany(query: IQuery): Promise<IResult<ISubject>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<ISubject>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Subject does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: ISubject): Promise<IResult<ISubject>> {
    if (await this.isExist({name: data.name}))
      throw new AlreadyExistException('Subject already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: ISubject
  ): Promise<IResult<ISubject>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<ISubject>> {
    return await this._repository.delete(query);
  }
}
