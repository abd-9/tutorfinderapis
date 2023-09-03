import { IPayment } from './payment.interface';
import { ICustomer, IUser } from './users.interface';

export interface ILink {
  _id?: String;
  name: String;
  url: String;
  imageUrl: String;
  active: Boolean;
  visitsCount: Number;
  higet?: Number;
  width?: Number;
  pixels?: Number;
  user?: IUser;
  description?: String;
  payment?: IPayment;
  type: LINK_TYPES;
  status: LINK_STATUS;
  rank: Number;
  tags: String[];
  owner?: ICustomer;
  customer?: ICustomer;
}

export enum LINK_TYPES {
  BLOG = '1',
  TOOL = '2',
  COURSE = '3',
  PLUGIN = '4',
}

export enum LINK_STATUS {
  INQUEUE = '1', // That means he did not pay for the link
  APPROVED = '2', // Approved by admin, should check from expiration date
  REJECTED = '3', // Rejected by the admin
  INREVIEW = '4', // He paid and waiting for the admin approval
}
