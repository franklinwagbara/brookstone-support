import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  IBoardingHouse,
} from '../interfaces';
import {BoardingHouseModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class BoardingHouseService implements IService<IBoardingHouse> {
  private readonly _repository: IRepository<IBoardingHouse>;

  constructor(repository?: IRepository<IBoardingHouse>) {
    this._repository =
      repository ?? new MongoDbRepository<IBoardingHouse>(BoardingHouseModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IBoardingHouse>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IBoardingHouse>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Boarding House does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: IBoardingHouse): Promise<IResult<IBoardingHouse>> {
    if (await this.isExist({name: data.name}))
      throw new AlreadyExistException('Boarding House already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IBoardingHouse
  ): Promise<IResult<IBoardingHouse>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IBoardingHouse>> {
    return await this._repository.delete(query);
  }
}
