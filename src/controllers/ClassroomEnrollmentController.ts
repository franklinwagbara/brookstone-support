import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IClassroomEnrollment,
} from '../interfaces';
import {ClassroomEnrollmentService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class ClassroomEnrollmentController
  implements IController<IClassroomEnrollment>
{
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _classroomEnrollmentService: ClassroomEnrollmentService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/classroomenrollment';
    this._classroomEnrollmentService = new ClassroomEnrollmentService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/classroomenrollment
       * @desc   return a list of classroomenrollments
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/classroomenrollment/id
       * @desc   returns a single classroomenrollment
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/classroomenrollment
       * @desc   creates a classroomenrollment
       * @access private
       */
      .post(
        `${this._path}`,
        validationMiddleware('classroomEnrollment'),
        this.save
      )

      /**
       * @route  PUT /api/classroomenrollment/id
       * @desc   updates a single classroomenrollment's record
       * @access private
       */
      .put(
        `${this._path}/:id`,
        validationMiddleware('classroomEnrollmentUpdate'),
        this.update
      )

      /**
       * @route  DELETE /api/classroomenrollment/id
       * @desc   deletes a single classroomenrollment's record
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
        'student',
        'subject',
        'session',
        'teacher',
        'classroom',
        'transcript',
      ]) as IQuery;
      const queryResult = await this._classroomEnrollmentService.getMany(query);

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
      const queryResult = await this._classroomEnrollmentService.getOne(query);

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
      const queryResult = await this._classroomEnrollmentService.save(req.body);

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

      if (!(await this._classroomEnrollmentService.isExist(query)))
        throw new DoesNotExistException(
          'Enrollment does not exist in database.'
        );

      const queryResult = await this._classroomEnrollmentService.update(
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

      if (!(await this._classroomEnrollmentService.isExist(query)))
        throw new DoesNotExistException(
          'Enrollment does not exist in database.'
        );

      const queryResult = await this._classroomEnrollmentService.delete({
        _id,
      } as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
