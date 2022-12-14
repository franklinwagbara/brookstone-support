import {Schema, model} from 'mongoose';
import {IUser} from '../interfaces';

const UserSchema = new Schema<IUser>(
  {
    username: {type: String, required: true},
    firstname: {type: String, required: false},
    lastname: {type: String, required: false},
    email: {type: String, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
  },
  {timestamps: true}
);

const UserModel = model<IUser>('User', UserSchema);

export {UserModel};
