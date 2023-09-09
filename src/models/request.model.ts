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
export enum REQUEST_REPETITION {
  ONCE = 1,
  DAILY = 2,
  WEEKLY = 3,
}

export interface IRequest {
  _id?: string;

  tutor?: Schema.Types.ObjectId;
  student?: Schema.Types.ObjectId;
  rate?: Number;
  startDateTime?: Date;
  endDateTime?: Date;
  note?: string;
  status?: REQUEST_STATUS;
  sessions?: Schema.Types.ObjectId[];
  repetition?: REQUEST_REPETITION;
}

const requestSchema = new Schema({
  tutor: {
    type: Schema.Types.ObjectId,
    required: true,
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
    default: REQUEST_STATUS.PENDING,
  },
  repetition: {
    type: String,
    enum: REQUEST_REPETITION,
    default: REQUEST_REPETITION.ONCE,
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
  _id?: Schema.Types.ObjectId;
  request?: Schema.Types.ObjectId;
  note?: string;
  startDateTime?: Date;
  endDateTime?: Date;
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
  startDateTime: {
    type: Date,
    required: true,
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: SESSION_STATUS,
    default: SESSION_STATUS.PENDING,
  },
});
export const SessionModel = model<ISession & Document>('Session', sessionSchema);

requestSchema.pre('remove', async function (next) {
  const request = this as unknown as IRequest;

  try {
    await model('Student').updateOne({ _id: request.student }, { $pull: { requests: request._id } });

    await model('Tutor').updateOne({ _id: request.tutor }, { $pull: { requests: request._id } });

    next();
  } catch (error) {
    next(error);
  }
});
