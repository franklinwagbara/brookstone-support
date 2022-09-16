import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IBehaviour,
} from '../interfaces';
import {BehaviourService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class ClassroomEnrollmentController implements IController<IBehaviour> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _behaviourService: BehaviourService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/behaviour';
    this._behaviourService = new BehaviourService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/behaviour
       * @desc   return a list of behaviours
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/behaviour/id
       * @desc   returns a single behaviour
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/behaviour
       * @desc   creates a behaviour
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('behaviour'), this.save)

      /**
       * @route  PUT /api/behaviour/id
       * @desc   updates a single behaviour's record
       * @access private
       */
      .put(
        `${this._path}/:id`,
        validationMiddleware('behaviourUpdate'),
        this.update
      )

      /**
       * @route  DELETE /api/behaviour/id
       * @desc   deletes a single behaviour's record
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
      const query = _.pick(req.query, ['student', 'session']) as IQuery;
      const queryResult = await this._behaviourService.getMany(query);

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
      const queryResult = await this._behaviourService.getOne(query);

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
      const queryResult = await this._behaviourService.save(req.body);

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

      if (!(await this._behaviourService.isExist(query)))
        throw new DoesNotExistException(
          'Enrollment does not exist in database.'
        );

      const queryResult = await this._behaviourService.update(
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

      if (!(await this._behaviourService.isExist(query)))
        throw new DoesNotExistException(
          'Enrollment does not exist in database.'
        );

      const queryResult = await this._behaviourService.delete({
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
