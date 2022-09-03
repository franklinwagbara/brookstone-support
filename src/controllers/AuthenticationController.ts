import express from 'express';
import {NextFunction} from 'express-serve-static-core';
import {IRequest, IResponse, IUser} from '../interfaces';
import {AuthenticationService} from '../services';
import {validationMiddleware} from '../middlewares';

export class AuthenticationController {
  private readonly _router: express.Router;
  private readonly _path: string;
  private readonly _authService: AuthenticationService;

  constructor(path?: string) {
    this._router = express.Router();
    this._path = path ?? '/auth';
    this._authService = new AuthenticationService();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this._router

      /**
       * @route   POST /api/auth/register
       * @desc    register a single user
       * @access  Public
       */
      .post(
        `${this._path}/register`,
        validationMiddleware('register'),
        this.register
      )

      /**
       * @route     POST /api/auth/login
       * @desc      login a single user
       * @access    Public
       */
      .post(`${this._path}/login`, validationMiddleware('login'), this.login)

      /**
       * @route     POST /api/auth/logout
       * @desc      logout a single user
       * @access    Public
       */
      .put(`${this._path}/logout`, this.logout);
  }

  public get router() {
    return this._router;
  }

  public createCookie = (
    res: IResponse,
    token: any,
    name?: string,
    days?: number
  ) => {
    return res.cookie(name ?? 'access-token', token, {
      expires: new Date(Date.now() + (days || 1) * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
  };

  public register = async (
    req: IRequest,
    res: IResponse,
    next: NextFunction
  ) => {
    try {
      const {token} = await this._authService.register(req.body as IUser);
      this.createCookie(res, token);

      //todo: flush cache after update

      return res.send({success: 'ok'});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  public login = async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      const {token} = await this._authService.login(req.body);

      //flush cache after update

      return res.send({success: 'ok'});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  public logout = async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      res.clearCookie('access-token');

      //flush cache after update

      return res.send({success: 'ok'});
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };
}
