import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IBoardingEnrollment,
} from '../interfaces';
import {BoardingEnrollmentService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class BoardingEnrollmentController
  implements IController<IBoardingEnrollment>
{
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _boardingEnrollmentService: BoardingEnrollmentService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/boardingenrollment';
    this._boardingEnrollmentService = new BoardingEnrollmentService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/boardingenrollment
       * @desc   return a list of boardingenrollments
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/boardingenrollment/id
       * @desc   returns a single boardingenrollment
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/boardingenrollment
       * @desc   creates a boardingenrollment
       * @access private
       */
      .post(
        `${this._path}`,
        validationMiddleware('boardingEnrollment'),
        this.save
      )

      /**
       * @route  PUT /api/boardingenrollment/id
       * @desc   updates a single boardingenrollment's record
       * @access private
       */
      .put(
        `${this._path}/:id`,
        validationMiddleware('boardingEnrollmentUpdate'),
        this.update
      )

      /**
       * @route  DELETE /api/boardingenrollment/id
       * @desc   deletes a single boardingenrollment's record
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
        'session',
        'boarding_house',
      ]) as IQuery;
      const queryResult = await this._boardingEnrollmentService.getMany(query);

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
      const queryResult = await this._boardingEnrollmentService.getOne(query);

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
      const queryResult = await this._boardingEnrollmentService.save(req.body);

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

      if (!(await this._boardingEnrollmentService.isExist(query)))
        throw new DoesNotExistException(
          'Boarding enrollment does not exist in database.'
        );

      const queryResult = await this._boardingEnrollmentService.update(
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

      if (!(await this._boardingEnrollmentService.isExist(query)))
        throw new DoesNotExistException(
          'Boarding enrollment does not exist in database.'
        );

      const queryResult = await this._boardingEnrollmentService.delete({
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
