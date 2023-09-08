import { model, Schema, Document } from 'mongoose';
import { ICustomer, IStudent, ITutor, IUser } from '@interfaces/users.interface';
import { ReviewSchema } from './review.model';

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

const TutorSchema: Schema = new Schema({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  expertises: {
    type: Number,
    required: false,
  },
  rate: {
    type: Number,
    required: false,
  },
  qualifications: {
    type: [String],
  },
  teachingStyle: {
    type: [String],
  },
  flexibility: {
    type: Boolean,
    default: false,
  },
  country: {
    type: String,
    required: false,
  },
  cities: {
    required: false,
    type: [String],
  },
  teachLevel: {
    required: false,
    type: [String],
  },
  reviews: [ReviewSchema],
  requests: [
    {
      required: false,
      type: Schema.Types.ObjectId,
      ref: 'Request',
    },
  ],
});

export const TutorModel = model<ITutor & Document>('Tutor', TutorSchema);

const StudentSchema: Schema = new Schema({
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  schoolName: {
    required: false,
    type: String,
  },
  studentLevel: {
    required: false,
    type: String,
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    required: false,
    type: String,
  },
  requests: [
    {
      required: false,
      type: Schema.Types.ObjectId,
      ref: 'Request',
    },
  ],
});
export const StudentModel = model<IStudent & Document>('Student', StudentSchema);
