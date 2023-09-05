import { IReview } from '@/models/review.model';
import { ILink } from './link.interface';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
}
export interface ITutor extends IUser {
  flexibility?: boolean;
  cities?: [string];
  country?: [string];
  location?: string;
  subjectsTaught?: string[];
  qualifications?: string[];
  teachingStyle?: string[];
  userId: string; // Reference to the User model
  reviews?: IReview[]; // Array of embedded reviews
}

export interface IStudent extends IUser {
  flexibility?: boolean;
  studyLevel?: string;
  location?: string;
  schoolName?: string;
}
export interface ICustomer {
  _id?: string;
  email: string;
  firstName: string;
  lastName?: string;
  country?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
}

export interface Subscriber extends IUser {
  tools: [ILink];
}
