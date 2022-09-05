import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {IQuery, IRepository, IResult, IService, IStudent} from '../interfaces';
import {StudentModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class StudentService implements IService<IStudent> {
  private readonly _repository: IRepository<IStudent>;

  constructor(repository?: IRepository<IStudent>) {
    this._repository =
      repository ?? new MongoDbRepository<IStudent>(StudentModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IStudent>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IStudent>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Student does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: IStudent): Promise<IResult<IStudent>> {
    if (
      (await this.isExist({first_name: data.first_name})) &&
      (await this.isExist({last_name: data.last_name})) &&
      (await this.isExist({other_names: data.other_names}))
    )
      throw new AlreadyExistException('Student already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IStudent
  ): Promise<IResult<IStudent>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IStudent>> {
    return await this._repository.delete(query);
  }
}
