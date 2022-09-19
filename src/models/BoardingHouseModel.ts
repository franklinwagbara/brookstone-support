import {Schema, model} from 'mongoose';
import {IBoardingHouse} from '../interfaces';

const BoardingHouseSchema = new Schema<IBoardingHouse>({
  name: {type: String, required: true},
  boarding_parent: {type: Schema.Types.ObjectId, ref: 'User'}, //todo: change we Teacher model is added
  students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
  year_group: {type: Schema.Types.ObjectId, ref: 'YearGroup'},
  section: {type: String, required: false},
});

export const BoardingHouseModel = model<IBoardingHouse>(
  'BoardingHouse',
  BoardingHouseSchema
);
