import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IEnrollment,
} from '../interfaces';
import {EnrollmentService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class EnrollmentController implements IController<IEnrollment> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _enrollmentService: EnrollmentService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/enrollment';
    this._enrollmentService = new EnrollmentService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/enrollment
       * @desc   return a list of enrollments
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/enrollment/id
       * @desc   returns a single enrollment
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/enrollment
       * @desc   creates a enrollment
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('enrollment'), this.save)

      /**
       * @route  PUT /api/enrollment/id
       * @desc   updates a single enrollment's record
       * @access private
       */
      .put(`${this._path}/:id`, validationMiddleware('enrollment'), this.update)

      /**
       * @route  DELETE /api/enrollment/id
       * @desc   deletes a single enrollment's record
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
      const queryResult = await this._enrollmentService.getMany(query);

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
      const queryResult = await this._enrollmentService.getOne(query);

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
      const queryResult = await this._enrollmentService.save(req.body);

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

      if (!(await this._enrollmentService.isExist(query)))
        throw new DoesNotExistException(
          'Enrollment does not exist in database.'
        );

      const queryResult = await this._enrollmentService.update(
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

      if (!(await this._enrollmentService.isExist(query)))
        throw new DoesNotExistException(
          'Enrollment does not exist in database.'
        );

      const queryResult = await this._enrollmentService.delete({_id} as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
