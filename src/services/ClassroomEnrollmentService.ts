import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  IClassroomEnrollment,
} from '../interfaces';
import {ClassroomEnrollmentModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class ClassroomEnrollmentService
  implements IService<IClassroomEnrollment>
{
  private readonly _repository: IRepository<IClassroomEnrollment>;

  constructor(repository?: IRepository<IClassroomEnrollment>) {
    this._repository =
      repository ??
      new MongoDbRepository<IClassroomEnrollment>(ClassroomEnrollmentModel);
  }
  public async getMany(query: IQuery): Promise<IResult<IClassroomEnrollment>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<IClassroomEnrollment>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Enrollment does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(
    data: IClassroomEnrollment
  ): Promise<IResult<IClassroomEnrollment>> {
    if (
      await this.isExist({
        student: data.student.toString(),
        session: data.session.toString(),
        classroom: data.classroom.toString(),
      })
    )
      throw new AlreadyExistException('Alredy Enrolled to this class!');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: IClassroomEnrollment
  ): Promise<IResult<IClassroomEnrollment>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<IClassroomEnrollment>> {
    return await this._repository.delete(query);
  }
}
