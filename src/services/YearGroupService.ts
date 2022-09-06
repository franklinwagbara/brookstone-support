import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  IYearGroup,
} from '../interfaces';
import {YearGroupModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class YearGroupService implements IService<IYearGroup> {
  private readonly _repository: IRepository<IYearGroup>;

  constructor(repository?: IRepository<IYearGroup>) {
    this._repository =
      repository ?? new MongoDbRepository<IYearGroup>(YearGroupModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IYearGroup>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IYearGroup>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'YearGroup does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: IYearGroup): Promise<IResult<IYearGroup>> {
    if (await this.isExist({year: data.year}))
      throw new AlreadyExistException('YearGroup already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IYearGroup
  ): Promise<IResult<IYearGroup>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IYearGroup>> {
    return await this._repository.delete(query);
  }
}
