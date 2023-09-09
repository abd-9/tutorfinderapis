import { Request } from 'express';
import { IUser } from '@interfaces/users.interface';

export interface DataStoredInToken {
  _id: string;
  studentId: string;
  tutorId: string;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}
