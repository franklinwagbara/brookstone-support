import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IYearGroup,
} from '../interfaces';
import {YearGroupService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class YearGroupController implements IController<IYearGroup> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _yearGroupService: YearGroupService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/yearGroup';
    this._yearGroupService = new YearGroupService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/yearGroup
       * @desc   return a list of yearGroups
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/yearGroup/id
       * @desc   returns a single yearGroup
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/yearGroup
       * @desc   creates a yearGroup
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('yearGroup'), this.save)

      /**
       * @route  PUT /api/yearGroup/id
       * @desc   updates a single yearGroup's record
       * @access private
       */
      .put(`${this._path}/:id`, validationMiddleware('yearGroup'), this.update)

      /**
       * @route  DELETE /api/yearGroup/id
       * @desc   deletes a single yearGroup's record
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
      const query = _.pick(req.query, ['year', 'session']) as IQuery;
      const queryResult = await this._yearGroupService.getMany(query);

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
      const queryResult = await this._yearGroupService.getOne(query);

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
      const queryResult = await this._yearGroupService.save(req.body);

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

      if (!(await this._yearGroupService.isExist(query)))
        throw new DoesNotExistException(
          'YearGroup does not exist in database.'
        );

      const queryResult = await this._yearGroupService.update(
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

      if (!(await this._yearGroupService.isExist(query)))
        throw new DoesNotExistException(
          'YearGroup does not exist in database.'
        );

      const queryResult = await this._yearGroupService.delete({_id} as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
