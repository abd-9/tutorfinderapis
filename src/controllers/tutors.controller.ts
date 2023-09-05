import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ITutor, IUser } from '@interfaces/users.interface';
import { TutorService } from '@/services/tutors.service';

export class TutorController {
  public tutor = Container.get(TutorService);

  // public getUsers = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const findAllUsersData: IUser[] = await this.user.findAllUser();

  //     res.status(200).json({ data: findAllUsersData, message: 'findAll' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  // public getUserById = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id;
  //     const findOneUserData: IUser = await this.user.findUserById(userId);

  //     res.status(200).json({ data: findOneUserData, message: 'findOne' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };

  public createTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tutorData: ITutor = req.body;

      const createTutorData: ITutor = await this.tutor.createTutor(tutorData);

      res.status(201).json({ data: createTutorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tutorId: string = req.params.id;
      const tutorData: ITutor = req.body;
      const updateTutorData: ITutor = await this.tutor.updateTutor(tutorId, tutorData);

      res.status(200).json({ data: updateTutorData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  // public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const userId: string = req.params.id;
  //     const deleteUserData: IUser = await this.user.deleteUser(userId);

  //     res.status(200).json({ data: deleteUserData, message: 'deleted' });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
