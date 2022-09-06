import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  ITranscript,
} from '../interfaces';
import {TranscriptService} from '../services';
import {validationMiddleware} from '../middlewares';
import {DoesNotExistException} from '../exceptions';
import _ from 'lodash';

export class TranscriptController implements IController<ITranscript> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _TranscriptService: TranscriptService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/transcript';
    this._TranscriptService = new TranscriptService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/transcript
       * @desc   return a list of transcripts
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/transcript/id
       * @desc   returns a single transcript
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/transcript
       * @desc   creates a transcript
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('transcript'), this.save)

      /**
       * @route  PUT /api/transcript/id
       * @desc   updates a single transcript's record
       * @access private
       */
      .put(`${this._path}/:id`, validationMiddleware('transcript'), this.update)

      /**
       * @route  DELETE /api/transcript/id
       * @desc   deletes a single transcript's record
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
        'classroom',
        'teacher',
        'week_1',
        'week_2',
        'week_3',
        'week_4',
        'half_term_exam',
        'ca_1',
        'week_5',
        'week_6',
        'week_7',
        'week_8',
        'ca_2',
        'final_exam',
        'total',
        'grade',
        'gpa',
        'comment',
      ]) as IQuery;
      const queryResult = await this._TranscriptService.getMany(query);

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
      const queryResult = await this._TranscriptService.getOne(query);

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
      const queryResult = await this._TranscriptService.save(req.body);

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

      if (!(await this._TranscriptService.isExist(query)))
        throw new DoesNotExistException(
          'Transcript does not exist in database.'
        );

      const queryResult = await this._TranscriptService.update(
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

      if (!(await this._TranscriptService.isExist(query)))
        throw new DoesNotExistException(
          'Transcript does not exist in database.'
        );

      const queryResult = await this._TranscriptService.delete({_id} as IQuery);

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
