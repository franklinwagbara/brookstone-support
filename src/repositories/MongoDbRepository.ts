import {FilterQuery, Model, UpdateQuery} from 'mongoose';
import {Exception} from '../exceptions';
import {IQuery, IRepository, IResult} from '../interfaces';
import {normalizeQuery} from '../utils';

export class MongoDbRepository<T> implements IRepository<T> {
  private readonly _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  public async getMany(query: IQuery): Promise<IResult<T>> {
    const modelName = this._model.modelName;
    const result = {} as IResult<T>;
    query = normalizeQuery(query);

    if (modelName === 'Student') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['session', 'year_group', 'classroom'])
        .exec();
    } else if (modelName === 'YearGroup') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['session'])
        .exec();
    } else if (modelName === 'Classroom') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['form_tutor', 'students', 'session', 'year_group'])
        .exec();
    } else if (modelName === 'Enrollment') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate([
          'student',
          'subject',
          'session',
          'teacher',
          'classroom',
          'transcript',
        ])
        .exec();
    } else if (modelName === 'Transcript') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['student', 'subject', 'session', 'teacher', 'classroom'])
        .exec();
    } else if (modelName === 'ClassroomEnrollment') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['student', 'session', 'classroom'])
        .exec();
    } else if (modelName === 'Behaviour') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['student', 'session'])
        .exec();
    } else if (modelName === 'BoardingHouse') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['boarding_parent', 'students', 'session', 'year_group'])
        .exec();
    } else if (modelName === 'BoardingEnrollment') {
      result.data = await this._model
        .find(query as FilterQuery<string>)
        .populate(['student', 'session', 'boarding_house'])
        .exec();
    } else result.data = await this._model.find(query as FilterQuery<string>);

    result.status = 200;
    return Promise.resolve(result);
  }
  public async getOne(query: IQuery): Promise<IResult<T>> {
    const result = {} as IResult<T>;
    const modelName = this._model.modelName;
    query = normalizeQuery(query);

    if (modelName === 'Student') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['session', 'year_group', 'classroom'])
        .exec()) as T;
    } else if (modelName === 'YearGroup') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['session'])
        .exec()) as T;
    } else if (modelName === 'Classroom') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['form_tutor', 'students', 'session', 'year_group'])
        .exec()) as T;
    } else if (modelName === 'Enrollment') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate([
          'student',
          'subject',
          'session',
          'teacher',
          'classroom',
          'transcript',
        ])
        .exec()) as T;
    } else if (modelName === 'ClassroomEnrollment') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['student', 'session', 'classroom'])
        .exec()) as T;
    } else if (modelName === 'Transcript') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['student', 'subject', 'session', 'teacher', 'classroom'])
        .exec()) as T;
    } else if (modelName === 'Behaviour') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['student', 'session', 'session'])
        .exec()) as T;
    } else if (modelName === 'BoardingHouse') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['boarding_parent', 'session', 'year_group'])
        .exec()) as T;
    } else if (modelName === 'BoardingEnrollment') {
      result.data = (await this._model
        .findOne(query as FilterQuery<string>)
        .populate(['student', 'session', 'boarding_house'])
        .exec()) as T;
    } else
      result.data = await this._model.findOne(query as FilterQuery<string>);

    result.status = 200;
    return result;
  }
  public async isExist(query: IQuery): Promise<boolean> {
    query = normalizeQuery(query);

    return (await this._model.findOne(query as FilterQuery<string>))
      ? true
      : false;
  }
  public async save(data: T): Promise<IResult<T>> {
    const result = {} as IResult<T>;
    const newData = new this._model(data);
    await newData.save();

    result.data = newData;
    result.status = 200;
    return result;
  }
  public async update(query: IQuery, data: T): Promise<IResult<T>> {
    const result = {} as IResult<T>;
    query = normalizeQuery(query);

    if (!(await this.isExist(query)))
      throw new Exception('Resource does not exist.');

    const newData = await this._model.findOneAndUpdate(
      query as FilterQuery<T>,
      data as UpdateQuery<T>,
      {new: true}
    );

    result.data = newData;
    result.status = 200;

    return result;
  }
  public async delete(query: IQuery): Promise<IResult<T>> {
    const result = {} as IResult<T>;
    query = normalizeQuery(query);

    if (!(await this.isExist(query)))
      throw new Exception('Resource does not exist.');

    const res = await this._model.findOneAndDelete(query as FilterQuery<T>);
    result.data = res;
    result.status = 200;

    return result;
  }
}
