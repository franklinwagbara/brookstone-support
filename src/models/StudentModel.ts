import {Schema, model} from 'mongoose';
import {IStudent, IUser} from '../interfaces';

const StudentSchema = new Schema<IStudent>(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    other_names: {type: String, required: false},
    gender: {type: String, required: true},
    session: {type: Schema.Types.ObjectId, ref: 'Session'},
    classroom: {type: Schema.Types.ObjectId, ref: 'Classroom'},
    year_group: {type: Schema.Types.ObjectId, ref: 'YearGroup'},
    dob: {type: Date, required: false},
    photo: {type: String, required: false},
  },
  {timestamps: true}
);

export const StudentModel = model<IStudent>('Student', StudentSchema);
