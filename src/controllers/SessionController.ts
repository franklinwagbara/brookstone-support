import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  ISession,
} from '../interfaces';
import {SessionService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class SessionController implements IController<ISession> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _sessionService: SessionService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/session';
    this._sessionService = new SessionService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/session
       * @desc   return a list of sessions
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/session/id
       * @desc   returns a single session
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/session
       * @desc   creates a session
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('session'), this.save)

      /**
       * @route  PUT /api/session/id
       * @desc   updates a single session's record
       * @access private
       */
      .put(`${this._path}/:id`, validationMiddleware('session'), this.update)

      /**
       * @route  DELETE /api/session/id
       * @desc   deletes a single session's record
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
      const query = _.pick(req.query, ['session', 'term']) as IQuery;
      const queryResult = await this._sessionService.getMany(query);

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
      const queryResult = await this._sessionService.getOne(query);

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
      const queryResult = await this._sessionService.save(req.body);

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

      if (!(await this._sessionService.isExist(query)))
        throw new DoesNotExistException('User does not exist in database.');

      const queryResult = await this._sessionService.update(
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

      if (!(await this._sessionService.isExist(query)))
        throw new DoesNotExistException('User does not exist in database.');

      const queryResult = await this._sessionService.delete({_id} as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
