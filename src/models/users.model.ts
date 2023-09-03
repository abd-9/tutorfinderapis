import { model, Schema, Document } from 'mongoose';
import { ICustomer, IUser } from '@interfaces/users.interface';

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
});

export const UserModel = model<IUser & Document>('User', UserSchema);

const CustomerSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

export const CustomerModel = model<ICustomer & Document>('Customer', CustomerSchema);
