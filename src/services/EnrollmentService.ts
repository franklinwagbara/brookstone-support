import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  IEnrollment,
} from '../interfaces';
import {EnrollmentModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class EnrollmentService implements IService<IEnrollment> {
  private readonly _repository: IRepository<IEnrollment>;

  constructor(repository?: IRepository<IEnrollment>) {
    this._repository =
      repository ?? new MongoDbRepository<IEnrollment>(EnrollmentModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IEnrollment>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IEnrollment>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Enrollment does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: IEnrollment): Promise<IResult<IEnrollment>> {
    if (
      (await this.isExist({_id: data.student.toString()} as IQuery)) &&
      (await this.isExist({_id: data.subject.toString()})) &&
      (await this.isExist({_id: data.session.toString()}))
    )
      throw new AlreadyExistException('Enrollment already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IEnrollment
  ): Promise<IResult<IEnrollment>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IEnrollment>> {
    return await this._repository.delete(query);
  }
}
