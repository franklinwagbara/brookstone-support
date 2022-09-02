import {IQuery} from '../interfaces';

export const normalizeQuery = (query: IQuery) => {
  for (let key in query) {
    if (key === '_id') continue;
    query[key] = new RegExp(query[key] as string, 'i');
  }

  return query;
};
