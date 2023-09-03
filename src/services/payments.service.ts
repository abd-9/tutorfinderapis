import { Service } from 'typedi';
import { HttpException, RESPONSE_STATUS } from '@exceptions/httpException';
import { PaymentModel } from '@/models/payment.model';
import { IPayment } from '@/interfaces/payment.interface';

@Service()
export class PaymentService {
  public async findALlPayments(): Promise<IPayment[]> {
    const payments: IPayment[] = await PaymentModel.find();
    return payments;
  }

  public async findPaymentById(paymentId: string): Promise<IPayment> {
    const findPayment: IPayment = await PaymentModel.findOne({ _id: paymentId });
    if (!findPayment) throw new HttpException(409, "IPayment doesn't exist");

    return findPayment;
  }

  public async createPayment(paymentData: IPayment): Promise<IPayment> {
    // const findPayment: IPayment = await PaymentModel.findOne({ url: paymentData.url });
    // if (findPayment) {
    //   if (findPayment.status === LINK_STATUS.INREVIEW)
    //     throw new HttpException(RESPONSE_STATUS.NotAcceptable, `This URL under ${paymentData.name} name is under review.`);
    //   if (findPayment.status === LINK_STATUS.INQUEUE)
    //     throw new HttpException(RESPONSE_STATUS.NotAcceptable, `This URL under ${paymentData.name} name is in queue.`);
    //   if (findPayment.status === LINK_STATUS.REJECTED)
    //     throw new HttpException(RESPONSE_STATUS.NotAcceptable, `This URL under ${paymentData.name} name has been rejected.`);
    // }

    const createdPayment: IPayment = await PaymentModel.create(paymentData);

    return createdPayment;
  }

  public async updatePayment(paymentId: string, paymentData: IPayment): Promise<IPayment> {
    const updateUserById: IPayment = await PaymentModel.findByIdAndUpdate(paymentId, paymentData, { new: true });
    if (!updateUserById) throw new HttpException(RESPONSE_STATUS.NotFound, "Payment doesn't exist");

    return updateUserById;
  }

  public async deletePayment(paymentId: string): Promise<IPayment> {
    const deletePaymentById: IPayment = await PaymentModel.findByIdAndDelete(paymentId);
    if (!deletePaymentById) throw new HttpException(RESPONSE_STATUS.DoesNotExist, "Payment doesn't exist");

    return deletePaymentById;
  }
}
