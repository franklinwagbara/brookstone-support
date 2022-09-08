import express, {Router, NextFunction} from 'express';
import {
  IController,
  IQuery,
  IRequest,
  IResponse,
  IResult,
  IUser,
} from '../interfaces';
import {UserService} from '../services';
import {validationMiddleware} from '../middlewares';
import {
  AlreadyExistException,
  DoesNotExistException,
  HttpException,
} from '../exceptions';
import _ from 'lodash';

export class UserController implements IController<IUser> {
  private readonly _router: Router;
  private readonly _path: string;
  private readonly _userService: UserService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/user';
    this._userService = new UserService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route  GET /api/user
       * @desc   return a list of users
       * @access private
       */
      .get(`${this._path}`, this.getMany)

      /**
       * @route  GET /api/user/currentUser
       * @desc   return the currentUser
       * @access private
       */
      .get(`${this._path}/currentuser`, this.getCurrentUser)

      /**
       * @route  GET /api/user/id
       * @desc   returns a single user
       * @access private
       */
      .get(`${this._path}/:id`, this.getOne)

      /**
       * @route  POST /api/user
       * @desc   creates a user
       * @access private
       */
      .post(`${this._path}`, validationMiddleware('user'), this.save)

      /**
       * @route  PUT /api/user/id
       * @desc   updates a single user's record
       * @access private
       */
      .put(`${this._path}/:id`, validationMiddleware('updateUser'), this.update)

      /**
       * @route  DELETE /api/user/id
       * @desc   deletes a single user's record
       * @access private
       */
      .delete(`${this._path}/:id`, this.delete);
  }

  public get router(): Router {
    return this._router;
  }

  getCurrentUser = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ): Promise<void | IResponse> => {
    try {
      const user = req.user;

      if (!user) next(new HttpException('No loggedin user.'));

      const data = _.pick(user, [
        '_id',
        'username',
        'firstname',
        'lastname',
        'email',
        'role',
      ]) as IUser;

      const queryResult: IResult<IUser> = {data, status: 200, error: null};

      //cache result

      return res.send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };

  public getMany = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ): Promise<void | IResponse> => {
    try {
      const query = _.pick(req.query, [
        'username',
        'firstname',
        'lastname',
        'email',
        'role',
      ]) as IQuery;
      const queryResult = await this._userService.getMany(query);

      if (queryResult.data) {
        let data = queryResult.data;
        data = (data as IUser[]).map((user: IUser) => {
          return _.pick(user, [
            '_id',
            'username',
            'firstname',
            'lastname',
            'email',
            'role',
          ]) as IUser;
        });

        queryResult.data = data;
        queryResult.error = null;
        queryResult.status = 200;
      }

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
      const queryResult = await this._userService.getOne(query);

      let data = queryResult.data as IUser;

      data = _.pick(data, [
        '_id',
        'username',
        'firstname',
        'lastname',
        'email',
        'role',
      ]) as IUser;

      queryResult.data = data;
      queryResult.error = null;
      queryResult.status = 200;

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
      const queryResult = await this._userService.save(req.body);

      let data = queryResult.data as IUser;

      data = _.pick(data, [
        '_id',
        'username',
        'firstname',
        'lastname',
        'email',
        'role',
      ]) as IUser;

      queryResult.data = data;
      queryResult.error = null;
      queryResult.status = 200;

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
      let queryResult;

      if (!(await this._userService.isExist(query)))
        throw new DoesNotExistException('User does not exist in database.');

      if (
        await this._userService.isExist({
          email: req.body?.email,
        } as IQuery)
      ) {
        queryResult = await this._userService.getOne({
          email: req.body?.email,
        } as IQuery);

        if (
          queryResult.data &&
          (queryResult.data as unknown as IQuery)._id?.toString() !== _id &&
          (queryResult.data as unknown as IQuery).email?.toString().trim() ===
            req.body?.email.trim()
        )
          throw new AlreadyExistException(
            'User with the same email already exists.'
          );
      }

      queryResult = await this._userService.update({_id} as IQuery, req.body);
      let data = queryResult.data as IUser;

      data = _.pick(data, [
        '_id',
        'username',
        'firstname',
        'lastname',
        'email',
        'role',
      ]) as IUser;
      queryResult.data = data;
      queryResult.error = null;
      queryResult.status = 200;

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

      if (!(await this._userService.isExist(query)))
        throw new DoesNotExistException('User does not exist in database.');

      const queryResult = await this._userService.delete({_id} as IQuery);
      let data = queryResult.data as IUser;

      data = _.pick(data, [
        '_id',
        'username',
        'firstname',
        'lastname',
        'email',
        'role',
      ]) as IUser;
      queryResult.data = data;
      queryResult.error = null;
      queryResult.status = 200;

      //flush cache after update: simplistic implementation, can be improved with more time
      //flushCache();

      return res.status(200).send(queryResult);
    } catch (error) {
      console.error(error);
      next(error);
    }
  };
}
