import {AlreadyExistException, DoesNotExistException} from '../exceptions';
import {
  IQuery,
  IRepository,
  IResult,
  IService,
  ITranscript,
} from '../interfaces';
import {TranscriptModel} from '../models';
import {MongoDbRepository} from '../repositories';

export class TranscriptService implements IService<ITranscript> {
  private readonly _repository: IRepository<ITranscript>;

  constructor(repository?: IRepository<ITranscript>) {
    this._repository =
      repository ?? new MongoDbRepository<ITranscript>(TranscriptModel);
  }
  public async getMany(query: IQuery): Promise<IResult<ITranscript>> {
    return await this._repository.getMany(query);
  }
  public async getOne(query: IQuery): Promise<IResult<ITranscript>> {
    if (!(await this.isExist(query)))
      throw new DoesNotExistException(
        'Transcript does not exist in the database.'
      );

    return await this._repository.getOne(query);
  }
  public async isExist(query: IQuery): Promise<boolean> {
    return await this._repository.isExist(query);
  }
  public async save(data: ITranscript): Promise<IResult<ITranscript>> {
    if (
      (await this.isExist({student: data.student.toString()})) &&
      (await this.isExist({subject: data.subject.toString()})) &&
      (await this.isExist({session: data.session.toString()}))
    )
      throw new AlreadyExistException('Transcript already exists');

    return await this._repository.save(data);
  }
  public async update(
    query: IQuery,
    data: ITranscript
  ): Promise<IResult<ITranscript>> {
    return await this._repository.update(query, data);
  }
  public async delete(query: IQuery): Promise<IResult<ITranscript>> {
    return await this._repository.delete(query);
  }
}
