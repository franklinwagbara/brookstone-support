import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import {AuthenticationController} from '../controllers';
import {IController, IDatabaseConnection} from '../interfaces';
import {errorHandlingMiddleware} from '../middlewares/';
import {MongoDbConnection} from '../services/';

export class App {
  private readonly _app: express.Application;
  private readonly _databaseConnection: IDatabaseConnection;
  private readonly _port: string | number;
  private readonly _authController: AuthenticationController;
  private readonly _controllers: IController<any>[];

  constructor(
    controllers: IController<any>[],
    databaseConnection?: IDatabaseConnection
  ) {
    this._app = express();
    this._databaseConnection = databaseConnection ?? new MongoDbConnection();
    this._port = process.env.PORT || 5000;
    this._controllers = controllers;
    this._authController = new AuthenticationController();
  }

  private async initializeComponents() {
    await this.initializeDatabaseConnection();
    this.initializeMiddelwares();
    this.initializeCaching();
    this.initializeControllers();
    this.initializeErrorHandling();
  }

  private async initializeDatabaseConnection() {
    await this._databaseConnection.connect();
  }

  private initializeMiddelwares() {
    this._app.use(
      helmet({
        contentSecurityPolicy: true,
      })
    );

    this._app.use(cookieParser());
  }

  private initializeCaching() {
    //Todo: Initialize caching here
  }

  private initializeErrorHandling() {
    this._app.use(errorHandlingMiddleware);
  }

  private initializeControllers() {
    this._controllers.forEach(controller => {
      this._app.use('/api/', controller.router);
    });
  }

  public listen() {
    this._app.listen(this._port, () =>
      console.log(`\nServer is listening on port ${this._port}...\n`)
    );
  }

  public async run() {
    await this.initializeComponents();
    this.listen();
  }
}
