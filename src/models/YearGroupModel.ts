import {Schema, model} from 'mongoose';
import {IYearGroup} from '../interfaces';

const YearGroupSchema = new Schema<IYearGroup>({
  year: {type: String, required: true},
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
});

export const YearGroupModel = model<IYearGroup>('YearGroup', YearGroupSchema);
