import { Service } from 'typedi';
import { HttpException, RESPONSE_STATUS } from '@exceptions/httpException';
import { IStudent, ITutor, IUser, USER_TYPE } from '@interfaces/users.interface';
import { StudentModel, TutorModel, UserModel } from '@models/users.model';
import { Container } from 'typedi';
import { UserService } from './users.service';
import RequestModel, { IRequest, REQUEST_STATUS } from '@/models/request.model';
import { ObjectId } from 'mongoose';
import { TutorService } from './tutors.service';

@Service()
export class StudentService {
  public userServices = Container.get(UserService);
  public tutorServeres = Container.get(TutorService);

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
  public async findStudentByUserId(userId: string): Promise<IStudent> {
    const findStudent: IStudent = await StudentModel.findOne({ user: userId });
    if (!findStudent) throw new HttpException(409, "Student doesn't exist");

    return findStudent;
  }

  public async createStudent(studentData: IStudent): Promise<IStudent> {
    const findUser: IUser = await UserModel.findOne({ email: studentData.email });
    if (findUser) throw new HttpException(409, `This email ${studentData.email} already exists`);
    const newUser: IUser = {
      email: studentData.email,
      password: studentData.password,
      name: studentData.name,
      type: USER_TYPE.STUDENT,
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
  public async sendSessionRequest(tutorId: string, studentId: string, requestData: IRequest): Promise<IRequest> {
    // const findTutor: ITutor = await this.tutorServeres.findTutorById(tutorId);
    const formatedRequest: IRequest = {
      ...requestData,
      student: studentId as unknown as ObjectId,
      tutor: tutorId as unknown as ObjectId,
    };

    try {
      const createdRequest = await this.createSesionRequest(formatedRequest);
      return createdRequest;
      // await TutorModel.findOneAndUpdate({ _id: tutorId }, { $push: { requests: createdRequest._id } }, { new: true });
      // await StudentModel.findByIdAndUpdate(studentId, { $push: { requests: createdRequest._id } });
    } catch (ex) {
      throw new HttpException(409, ex.message);
    }
  }

  public async createSesionRequest(requestData: IRequest): Promise<IRequest> {
    try {
      const createdRequest: IRequest = await RequestModel.create({ ...requestData });
      return createdRequest;
    } catch (ex) {
      throw new HttpException(409, ex.message);
    }
  }
  public async updateSesionRequest(requestId, requestData: IRequest): Promise<IRequest> {
    try {
      const updatedRequest: IRequest = await RequestModel.findByIdAndUpdate(requestId, { ...requestData }, { new: true }).populate({
        path: 'sessions',
        model: 'Session',
      });
      return updatedRequest;
    } catch (ex) {
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
    } else {
      if (studentData.name) await UserModel.findByIdAndUpdate(studentData.userId, { name: studentData.name });
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
