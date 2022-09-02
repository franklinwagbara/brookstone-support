import mongoose from 'mongoose';
import {IDatabaseConnection} from '../interfaces';

export class MongoDbConnection implements IDatabaseConnection {
  private readonly _db_uri: string;

  constructor(db_uri?: string) {
    this._db_uri = db_uri ?? (process.env.DB_URI || '');
  }
  async connect(): Promise<void> {
    await mongoose.connect(this._db_uri);
  }
  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
