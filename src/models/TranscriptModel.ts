import {Schema, model} from 'mongoose';
import {ITranscript} from '../interfaces';

const TranscriptSchema = new Schema<ITranscript>({
  student: {type: Schema.Types.ObjectId, ref: 'Student'},
  subject: {type: Schema.Types.ObjectId, ref: 'Subject'},
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
  classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
  teacher: {type: Schema.Types.ObjectId, ref: 'User'},
  week_1: {type: Number, required: false},
  week_2: {type: Number, required: false},
  week_3: {type: Number, required: false},
  week_4: {type: Number, required: false},
  half_term_exam: {type: Number, required: false},
  ca_1: {type: Number, required: false},
  ccm: {type: Number, required: false},
  week_5: {type: Number, required: false},
  week_6: {type: Number, required: false},
  week_7: {type: Number, required: false},
  week_8: {type: Number, required: false},
  ca_2: {type: Number, required: false},
  final_exam: {type: Number, required: false},
  total: {type: Number, required: false},
  grade: {type: String, required: false},
  gpa: {type: String, required: false},
  comment: {type: String, required: false},
});

export const TranscriptModel = model<ITranscript>(
  'Transcript',
  TranscriptSchema
);
