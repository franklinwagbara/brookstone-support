import {Schema, model} from 'mongoose';
import {IEnrollment} from '../interfaces';

const EnrollmentSchema = new Schema<IEnrollment>({
  student: {type: Schema.Types.ObjectId, ref: 'Student'},
  subject: {type: Schema.Types.ObjectId, ref: 'Subject'},
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
  teacher: {type: Schema.Types.ObjectId, ref: 'User'},
  classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
  transcript: {type: Schema.Types.ObjectId, ref: 'Transcript'},
});

export const EnrollmentModel = model<IEnrollment>(
  'Enrollment',
  EnrollmentSchema
);
