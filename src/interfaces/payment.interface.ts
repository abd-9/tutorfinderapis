import { Subscriber } from './users.interface';

export interface IPayment {
  _id?: String;
  active: Boolean;
  subscriber?: Subscriber;
  paymentDate: Date | String;
  amount: Number;
  transactionId: String;
}
