import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IBoardingHouse,
} from '../interfaces';
import {BoardingHouseService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class BoardingHouseController implements IController<IBoardingHouse> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _boardingHouseService: BoardingHouseService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/boardinghouse';
    this._boardingHouseService = new BoardingHouseService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/boardinghouse
       * @desc   return a list of boardinghouses
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/boardinghouse/id
       * @desc   returns a single boardinghouse
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/boardinghouse
       * @desc   creates a boardinghouse
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('boardingHouse'), this.save)

      /**
       * @route  PUT /api/boardinghouse/id
       * @desc   updates a single boardinghouse's record
       * @access private
       */
      .put(
        `${this._path}/:id`,
        validationMiddleware('boardingHouseUpdate'),
        this.update
      )

      /**
       * @route  DELETE /api/boardinghouse/id
       * @desc   deletes a single boardinghouse's record
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
        'name',
        'boarding_parent',
        'students',
        'session',
        'year_group',
        'section',
      ]) as IQuery;
      const queryResult = await this._boardingHouseService.getMany(query);

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
      const queryResult = await this._boardingHouseService.getOne(query);

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
      const queryResult = await this._boardingHouseService.save(req.body);

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

      if (!(await this._boardingHouseService.isExist(query)))
        throw new DoesNotExistException(
          'Boarding house does not exist in database.'
        );

      const queryResult = await this._boardingHouseService.update(
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

      if (!(await this._boardingHouseService.isExist(query)))
        throw new DoesNotExistException(
          'Boarding house does not exist in database.'
        );

      const queryResult = await this._boardingHouseService.delete({
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
