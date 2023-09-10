import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, UpdateStudentDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { StudentController } from '@/controllers/students.controller';
import { SendSessionRequestDTO, UpdateSessionRequestDTO } from '@/dtos/requests.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';

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
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.student.getStudentById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.student.createStudent);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateStudentDto, true), this.student.updateStudent);
    this.router.post(
      `${this.path}/:studentId/request/:tutorId`,
      AuthMiddleware,
      ValidationMiddleware(SendSessionRequestDTO),
      this.student.sendSessionRequest,
    );
    this.router.put(
      `${this.path}/request/:requestId`,
      AuthMiddleware,
      ValidationMiddleware(UpdateSessionRequestDTO),
      this.student.updateSessionRequest,
    );
  }
}
