import {IQuery} from '../interfaces';
import mongoose from 'mongoose';

export const normalizeQuery = (query: IQuery) => {
  for (let key in query) {
    if (
      // key === '_id' ||
      // key === 'student' ||
      // key === 'teacher' ||
      // key === 'subject' ||
      // key === 'session' ||
      // key === 'transcript'
      mongoose.Types.ObjectId.isValid(query[key] as string)
    )
      continue;
    query[key] = new RegExp(query[key] as string, 'i');
  }

  return query;
};
