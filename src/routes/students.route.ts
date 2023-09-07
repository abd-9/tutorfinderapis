import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, ReviewDto, UpdateStudentDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { StudentController } from '@/controllers/students.controller';

export class StudentRoute implements Routes {
  public path = '/students';
  public router = Router();
  public student = new StudentController();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.student.getStudents);
    this.router.get(`${this.path}/:id`, this.student.getStudentById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.student.createStudent);
    this.router.put(`${this.path}/:id`, ValidationMiddleware(UpdateStudentDto, true), this.student.updateStudent);
    // this.router.delete(`${this.path}/:id`, this.user.deleteUser);
  }
}
