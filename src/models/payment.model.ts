import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { IPayment } from '@/interfaces/payment.interface';

const PaymentSchema: Schema = new Schema({
  active: {
    type: Boolean,
    default: false,
  },
  amount: {
    type: Number,
    default: false,
  },
  transactionId: {
    type: String,
    requierd: false,
  },

  // createdDate: {
  //   type: Date,
  //   required: false,
  //   // add defualt value after 3 monthes
  // },

  subscriber: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const PaymentModel = model<IPayment & Document>('Payment', PaymentSchema);
