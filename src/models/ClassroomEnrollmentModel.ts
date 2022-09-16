import {Schema, model} from 'mongoose';
import {IEnrollment} from '../interfaces';
import {IClassroomEnrollment} from '../interfaces/IClassroomEnrollment';

const ClassroomEnrollmentSchema = new Schema<IClassroomEnrollment>({
  student: {type: Schema.Types.ObjectId, ref: 'Student'},
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
  classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
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

export const ClassroomEnrollmentModel = model<IClassroomEnrollment>(
  'ClassroomEnrollment',
  ClassroomEnrollmentSchema
);
