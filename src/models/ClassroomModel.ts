import {Schema, model} from 'mongoose';
import {IClassroom} from '../interfaces';

const ClassroomSchema = new Schema<IClassroom>({
  name: {type: String, required: true},
  form_tutor: {type: Schema.Types.ObjectId, ref: 'IUser'}, //todo: change we Teacher model is added
  students: [{type: Schema.Types.ObjectId, ref: 'Student'}],
  session: {type: Schema.Types.ObjectId, ref: 'Session'},
  year_group: {type: Schema.Types.ObjectId, ref: 'YearGroup'},
  section: {type: String, required: false},
});

export const ClassroomModel = model<IClassroom>('Classroom', ClassroomSchema);
