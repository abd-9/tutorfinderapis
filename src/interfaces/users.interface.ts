import { ILink } from './link.interface';

export interface IUser {
  _id?: string;
  email: string;
  password: string;
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
