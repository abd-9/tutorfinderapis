import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

export class RequestRoute implements Routes {
  public path = '/request';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:requestStatus`, AuthMiddleware, this.user.getMyRequsetsByStatus);
    this.router.get(`${this.path}`, AuthMiddleware, this.user.getMyRequsetsByStatus);
    this.router.put(`${this.path}/:requestId/:requestStatus`, AuthMiddleware, this.user.updateRequestStatus);
  }
}
