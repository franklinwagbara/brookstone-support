import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IStudent,
} from '../interfaces';
import {StudentService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class StudentController implements IController<IStudent> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _studentService: StudentService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/student';
    this._studentService = new StudentService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/student
       * @desc   return a list of students
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/student/id
       * @desc   returns a single student
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/student
       * @desc   creates a student
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('student'), this.save)

      /**
       * @route  PUT /api/student/id
       * @desc   updates a single student's record
       * @access private
       */
      .put(
        `${this._path}/:id`,
        validationMiddleware('studentUpdate'),
        this.update
      )

      /**
       * @route  DELETE /api/student/id
       * @desc   deletes a single student's record
       * @access private
       */
      .delete(`${this._path}/:id`, this.delete);
  }

  public get router(): Router {
    return this._router;
  }

  public getMany = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ): Promise<void | IResponse> => {
    try {
      const query = _.pick(req.query, [
        'first_name',
        'last_name',
        'other_name',
        'gender',
        'session',
        'year_group',
        'dob',
        'photo',
      ]) as IQuery;
      const queryResult = await this._studentService.getMany(query);

      //cache result
      //await cachedQuery(req.originalUrl, queryResult);

      return res.send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getOne = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ): Promise<void | IResponse> => {
    try {
      const query: IQuery = {_id: req.params.id};
      const queryResult = await this._studentService.getOne(query);

      //cache result
      //await cachedQuery(req.originalUrl, queryResult);

      return res.send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
  public save = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ): Promise<void | IResponse> => {
    try {
      const queryResult = await this._studentService.save(req.body);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public update = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ): Promise<void | IResponse> => {
    try {
      const _id = req.params.id as string;
      const query = {_id} as IQuery;

      if (!(await this._studentService.isExist(query)))
        throw new DoesNotExistException('student does not exist in database.');

      const queryResult = await this._studentService.update(
        {_id} as IQuery,
        req.body
      );

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public delete = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ): Promise<void | IResponse> => {
    try {
      const _id = req.params.id as string;
      const query = {_id} as IQuery;

      if (!(await this._studentService.isExist(query)))
        throw new DoesNotExistException('student does not exist in database.');

      const queryResult = await this._studentService.delete({_id} as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
