import { Document, Schema, model } from 'mongoose';

export enum REQUEST_STATUS {
  PENDING = 1,
  ACCEPTED = 2,
  REJECTED = 3,
  CANCELLED = 4,
  COMPLETED = 5,
}
export enum SESSION_STATUS {
  PENDING = 1,
  CANCELLED = 2,
  COMPLETED = 3,
}

export interface IRequest {
  tutor?: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
  rate?: Number;
  startDateTime: Date;
  endDateTime: Date;
  note?: string;
  status?: REQUEST_STATUS;
  sessions?: Schema.Types.ObjectId[];
}

const requestSchema = new Schema({
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  rate: {
    type: Number,
  },
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    enum: REQUEST_STATUS,
    default: 'PENDING',
  },
  sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Session',
      required: false,
    },
  ],
});

const RequestModel = model<IRequest & Document>('Request', requestSchema);

export default RequestModel;

export interface ISession {
  request?: Schema.Types.ObjectId;
  note?: string;
  status?: SESSION_STATUS;
}
const sessionSchema = new Schema({
  request: {
    type: Schema.Types.ObjectId,
    ref: 'Request',
  },
  note: {
    type: String,
  },
  status: {
    type: String,
    enum: SESSION_STATUS,
    default: SESSION_STATUS.PENDING,
  },
});
export const SessionModel = model<IRequest & Document>('Request', sessionSchema);
