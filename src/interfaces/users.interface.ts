import { IReview } from '@/models/review.model';
import { ILink } from './link.interface';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  name: string;
}
export interface ITutor extends IUser {
  _id?: string;
  flexibility?: boolean;
  cities?: [string];
  country?: [string];
  location?: string;
  rate?: number;
  subjectsTaught?: string[];
  qualifications?: string[];
  teachingStyle?: string[];
  userId?: string; // Reference to the User model
  user?: IUser;
  reviews?: IReview[]; // Array of embedded reviews
}

export interface IStudent extends IUser {
  _id?: string;
  flexibility?: boolean;
  studyLevel?: string;
  location?: string;
  userId?: string;
  user?: IUser;
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
