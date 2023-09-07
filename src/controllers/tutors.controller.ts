import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ITutor } from '@interfaces/users.interface';
import { TutorService } from '@/services/tutors.service';
import { IReview } from '@/models/review.model';

export class TutorController {
  public tutor = Container.get(TutorService);

  public getTutors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllTutor: ITutor[] = await this.tutor.findAllTutor();

      res.status(200).json({ data: findAllTutor, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTutorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tutorId: string = req.params.id;
      const findOneTutorData: ITutor = await this.tutor.findTutorById(tutorId);

      res.status(200).json({ data: findOneTutorData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTutor = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tutorData: ITutor = req.body;

      const createTutorData: ITutor = await this.tutor.createTutor(tutorData);

      res.status(201).json({ data: createTutorData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public addTutorReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tutorId: string = req.params.id;
      const reviewData: IReview = req.body;
      const reviewList = await this.tutor.addTutorReview(tutorId, reviewData);

      res.status(200).json({ data: reviewList, message: 'updated' });
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
