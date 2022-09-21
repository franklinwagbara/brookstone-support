import {Schema, model} from 'mongoose';
import {IBoardingEnrollment} from '../interfaces/';

const BoardingEnrollmentSchema = new Schema<IBoardingEnrollment>({
  student: {type: Schema.Types.ObjectId, ref: 'Student'},
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
  boarding_house: {type: Schema.Types.ObjectId, ref: 'BoardingHouse'},
  week_1_comment: {type: String, required: false},
  week_2_comment: {type: String, required: false},
  week_3_comment: {type: String, required: false},
  week_4_comment: {type: String, required: false},
  week_5_comment: {type: String, required: false},
  week_6_comment: {type: String, required: false},
  week_7_comment: {type: String, required: false},
  week_8_comment: {type: String, required: false},
  week_9_comment: {type: String, required: false},
  half_term_comment: {type: String, required: false},
  end_of_term_comment: {type: String, required: false},
});

export const BoardingEnrollmentModel = model<IBoardingEnrollment>(
  'BoardingEnrollment',
  BoardingEnrollmentSchema
);
