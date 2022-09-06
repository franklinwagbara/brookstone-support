import {Schema, model} from 'mongoose';
import {ISession} from '../interfaces';

const SessionSchema = new Schema<ISession>({
  session: {type: String, required: true},
  term: {type: String, required: true},
  current: {type: String, required: true, default: 'false'},
});

export const SessionModel = model<ISession>('Session', SessionSchema);
