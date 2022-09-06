import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IClassroom,
} from '../interfaces';
import {ClassroomService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class ClassroomController implements IController<IClassroom> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _classroomService: ClassroomService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/classroom';
    this._classroomService = new ClassroomService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/classroom
       * @desc   return a list of classrooms
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/classroom/id
       * @desc   returns a single classroom
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/classroom
       * @desc   creates a classroom
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('classroom'), this.save)

      /**
       * @route  PUT /api/classroom/id
       * @desc   updates a single classroom's record
       * @access private
       */
      .put(`${this._path}/:id`, validationMiddleware('classroom'), this.update)

      /**
       * @route  DELETE /api/classroom/id
       * @desc   deletes a single classroom's record
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
        'form_tutor',
        'students',
        'session',
        'year_group',
        'section',
      ]) as IQuery;
      const queryResult = await this._classroomService.getMany(query);

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
      const queryResult = await this._classroomService.getOne(query);

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
      const queryResult = await this._classroomService.save(req.body);

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

      if (!(await this._classroomService.isExist(query)))
        throw new DoesNotExistException(
          'Classroom does not exist in database.'
        );

      const queryResult = await this._classroomService.update(
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

      if (!(await this._classroomService.isExist(query)))
        throw new DoesNotExistException(
          'Classroom does not exist in database.'
        );

      const queryResult = await this._classroomService.delete({_id} as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
