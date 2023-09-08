import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, ReviewDto, UpdateTutorDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { TutorController } from '@/controllers/tutors.controller';

export class TutorRoute implements Routes {
  public path = '/tutors';
  public router = Router();
  public tutor = new TutorController();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.tutor.getTutors);
    this.router.get(`${this.path}/:id`, this.tutor.getTutorById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.tutor.createTutor);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateTutorDto, true), this.tutor.updateTutor);
    this.router.post(`${this.path}/:id/review`, ValidationMiddleware(ReviewDto, true), this.tutor.addTutorReview);
    // this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
