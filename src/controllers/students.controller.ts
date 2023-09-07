import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { IStudent } from '@interfaces/users.interface';
import { StudentService } from '@/services/students.service';

export class StudentController {
  public student = Container.get(StudentService);

  public getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllStudent: IStudent[] = await this.student.findAllStudent();

      res.status(200).json({ data: findAllStudent, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId: string = req.params.id;
      const findOneStudentData: IStudent = await this.student.findStudentById(studentId);

      res.status(200).json({ data: findOneStudentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentData: IStudent = req.body;

      const createStudentData: IStudent = await this.student.createStudent(studentData);

      res.status(201).json({ data: createStudentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentId: string = req.params.id;
      const studentData: IStudent = req.body;
      const updateStudentData: IStudent = await this.student.updateStudent(studentId, studentData);

      res.status(200).json({ data: updateStudentData, message: 'updated' });
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
