import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IUser } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import { RequestService } from '@/services/requests.service';
import { IRequest, REQUEST_STATUS } from '@/models/request.model';

export class UserController {
  public user = Container.get(UserService);
  public requestService = Container.get(RequestService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllUsersData: IUser[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const findOneUserData: IUser = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      const createUserData: IUser = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const userData: IUser = req.body;
      const updateUserData: IUser = await this.user.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };
  public getMyRequsetsByStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = res.locals.userId;
      const tutorId: string = res.locals.tutorId;
      const studentId: string = res.locals.studentId;
      const requestStatus = req.params?.requestStatus;

      const myRequests: IRequest[] = await this.requestService.getMyRequestsByStatus(tutorId || studentId, requestStatus);

      res.status(200).json({ data: myRequests });
    } catch (error) {
      next(error);
    }
  };
  public updateRequestStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = res.locals.userId;
      const tutorId: string = res.locals.tutorId;
      const studentId: string = res.locals.studentId;
      const requestStatus = req.params?.requestStatus;
      const requestId = req.params?.requestId;

      const myRequests: IRequest = await this.requestService.updateRequestStatus(requestId, requestStatus);

      res.status(200).json({ data: myRequests });
    } catch (error) {
      next(error);
    }
  };
  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.params.id;
      const deleteUserData: IUser = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
