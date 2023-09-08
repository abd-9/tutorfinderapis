import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { IStudent, IUser } from '@interfaces/users.interface';
import { StudentModel, UserModel } from '@models/users.model';
import { Container } from 'typedi';
import { UserService } from './users.service';

@Service()
export class StudentService {
  public userServices = Container.get(UserService);

  public async findAllStudent(): Promise<IStudent[]> {
    const students: IStudent[] = await StudentModel.find().populate({
      path: 'user',
      model: 'User',
    });
    return students;
  }

  public async findStudentById(studentId: string): Promise<IStudent> {
    const findStudent: IStudent = await StudentModel.findOne({ _id: studentId }).populate({
      path: 'user',
      model: 'User',
    });
    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    return findStudent;
  }

  public async createStudent(studentData: IStudent): Promise<IStudent> {
    const findUser: IStudent = await StudentModel.findOne({ email: studentData.email });
    if (findUser) throw new HttpException(409, `This email ${studentData.email} already exists`);
    const newUser: IUser = {
      email: studentData.email,
      password: studentData.password,
      name: studentData.name,
    };

    const createdUser = await this.userServices.createUser(newUser);
    try {
      const createUserData: IStudent = await StudentModel.create({ ...studentData, user: createdUser._id });
      return createUserData;
    } catch (ex) {
      this.userServices.deleteUser(createdUser._id);
      throw new HttpException(409, ex.message);
    }
  }

  public async updateStudent(studentId: string, studentData: IStudent): Promise<IStudent> {
    if (studentData.email) {
      const findUser: IUser = await UserModel.findOne({ email: studentData.email });
      if (findUser && findUser._id != studentId) throw new HttpException(409, `This email ${studentData.email} already exists`);
      else {
        await UserModel.findByIdAndUpdate(studentData.userId, { email: studentData.email });
      }
    }

    // TODO: have to check if email will be added to the student modal then i have to remove the attributes form the object
    const updatedStudentById: IStudent = await StudentModel.findByIdAndUpdate(studentId, { ...studentData });
    if (!updatedStudentById) throw new HttpException(409, "Student doesn't exist");

    return updatedStudentById;
  }

  public async deleteStudent(userId: string): Promise<IUser> {
    const deleteUserById: IUser = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "IUser doesn't exist");

    return deleteUserById;
  }
}
