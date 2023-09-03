import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { PaymentController } from '@/controllers/payments.controller';
import { CreatePaymentDTO, UpdatePaymentDTO } from '@/dtos/payments.dto';

export class PaymentRoute implements Routes {
  public path = '/payments';
  public router = Router();
  public payment = new PaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.payment.getPayments);
    this.router.post(`${this.path}`, ValidationMiddleware(CreatePaymentDTO), this.payment.createPayment);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdatePaymentDTO), this.payment.updatePayment);
    this.router.delete(`${this.path}/:id`, this.payment.deletePayment);
  }
}
