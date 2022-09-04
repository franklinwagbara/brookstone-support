import {Schema, model} from 'mongoose';
import {IStudent, IUser} from '../interfaces';

const StudentSchema = new Schema<IStudent>(
  {
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    other_names: {type: String, required: true},
    gender: {type: String, required: true},
    session: {type: Schema.Types.ObjectId, ref: 'Session'},
    dob: {type: Date, required: false},
    photo: {type: String, required: false},
  },
  {timestamps: true}
);

export const StudentModel = model<IUser>('Student', StudentSchema);
