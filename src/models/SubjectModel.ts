import {Schema, model} from 'mongoose';
import {ISubject} from '../interfaces';

const SubjectSchema = new Schema<ISubject>({
  name: {type: String, required: true},
});

export const SubjectModel = model<ISubject>('Subject', SubjectSchema);
