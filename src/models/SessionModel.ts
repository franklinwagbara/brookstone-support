import {Schema, model} from 'mongoose';
import {ISession} from '../interfaces';

const SessionSchema = new Schema<ISession>({
  session: {type: String, required: true},
  term: {type: String, required: true},
});

export const SessionModel = model<ISession>('Session', SessionSchema);
