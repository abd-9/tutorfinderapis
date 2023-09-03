import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IPayment } from '@/interfaces/payment.interface';
import { PaymentService } from '@/services/payments.service';
import { RESPONSE_STATUS } from '@/exceptions/httpException';
import { DateHelper } from '@/utils/dateHelper';

export class PaymentController {
  public payment = Container.get(PaymentService);

  public getPayments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IPayment[] = await this.payment.findALlPayments();

      res.status(RESPONSE_STATUS.OK).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentData: IPayment = req.body;
      // paymentData.status = LINK_STATUS.INQUEUE;
      const createPaymentData: IPayment = await this.payment.createPayment(paymentData);

      res.status(RESPONSE_STATUS.OK).json({ data: createPaymentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId: string = req.params.id;
      const paymentData: IPayment = req.body;
      const updateUserData: IPayment = await this.payment.updatePayment(paymentId, paymentData);

      paymentData.paymentDate = DateHelper.IsoFormat();
      res.status(RESPONSE_STATUS.OK).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId: string = req.params.id;
      const deletePaymentData: IPayment = await this.payment.deletePayment(paymentId);

      res.status(RESPONSE_STATUS.OK).json({ data: deletePaymentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
