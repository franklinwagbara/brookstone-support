import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  IBoardingEnrollment,
} from '../interfaces';
import {BoardingEnrollmentModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class BoardingEnrollmentService
  implements IService<IBoardingEnrollment>
{
  private readonly _repository: IRepository<IBoardingEnrollment>;

  constructor(repository?: IRepository<IBoardingEnrollment>) {
    this._repository =
      repository ??
      new MongoDbRepository<IBoardingEnrollment>(BoardingEnrollmentModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IBoardingEnrollment>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IBoardingEnrollment>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Boarding Enrollment does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(
    data: IBoardingEnrollment
  ): Promise<IResult<IBoardingEnrollment>> {
    if (
      await this.isExist({
        student: data.student.toString(),
        session: data.session.toString(),
        boarding_house: data.boarding_house.toString(),
      })
    )
      throw new AlreadyExistException(
        'Alredy Enrolled to this boarding house!'
      );

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IBoardingEnrollment
  ): Promise<IResult<IBoardingEnrollment>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IBoardingEnrollment>> {
    return await this._repository.delete(query);
  }
}
