import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  ISubject,
} from '../interfaces';
import {SubjectService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class SubjectController implements IController<ISubject> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _subjectService: SubjectService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/subject';
    this._subjectService = new SubjectService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/subject
       * @desc   return a list of subjects
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/subject/id
       * @desc   returns a single subject
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/subject
       * @desc   creates a subject
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('subject'), this.save)

      /**
       * @route  PUT /api/subject/id
       * @desc   updates a single subject's record
       * @access private
       */
      .put(`${this._path}/:id`, validationMiddleware('subject'), this.update)

      /**
       * @route  DELETE /api/subject/id
       * @desc   deletes a single subject's record
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
      const query = _.pick(req.query, ['subject']) as IQuery;
      const queryResult = await this._subjectService.getMany(query);

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
      const queryResult = await this._subjectService.getOne(query);

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
      const queryResult = await this._subjectService.save(req.body);

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

      if (!(await this._subjectService.isExist(query)))
        throw new DoesNotExistException('Subject does not exist in database.');

      const queryResult = await this._subjectService.update(
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

      if (!(await this._subjectService.isExist(query)))
        throw new DoesNotExistException('Subject does not exist in database.');

      const queryResult = await this._subjectService.delete({_id} as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
