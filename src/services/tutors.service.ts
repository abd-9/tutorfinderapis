import { hash } from 'bcrypt';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { ITutor, IUser } from '@interfaces/users.interface';
import { TutorModel, UserModel } from '@models/users.model';
import { Container } from 'typedi';
import { UserService } from './users.service';

@Service()
export class TutorService {
  public userServices = Container.get(UserService);

  // public async findAllUser(): Promise<IUser[]> {
  //   const users: IUser[] = await UserModel.find();
  //   return users;
  // }

  public async findTutorById(tutorId: string): Promise<ITutor> {
    const findTutor: ITutor = await TutorModel.findOne({ _id: tutorId });
    if (!findTutor) throw new HttpException(409, "IUser doesn't exist");

    return findTutor;
  }

  public async createTutor(tutorData: ITutor): Promise<ITutor> {
    console.log(tutorData);
    const findUser: ITutor = await TutorModel.findOne({ email: tutorData.email });
    if (findUser) throw new HttpException(409, `This email ${tutorData.email} already exists1`);
    const newUser: IUser = {
      email: tutorData.email,
      password: tutorData.password,
      name: tutorData.name,
    };
    const createdUser = await this.userServices.createUser(newUser);
    try {
      const createUserData: ITutor = await TutorModel.create({ ...tutorData, userId: createdUser._id });
      return createUserData;
    } catch (ex) {
      this.userServices.deleteUser(createdUser._id);
      throw new HttpException(409, ex.message);
    }
  }

  public async updateUser(userId: string, userData: IUser): Promise<IUser> {
    if (userData.email) {
      const findUser: IUser = await UserModel.findOne({ email: userData.email });
      if (findUser && findUser._id != userId) throw new HttpException(409, `This email ${userData.email} already exists`);
    }

    if (userData.password) {
      const hashedPassword = await hash(userData.password, 10);
      userData = { ...userData, password: hashedPassword };
    }

    const updateUserById: IUser = await UserModel.findByIdAndUpdate(userId, { ...userData });
    if (!updateUserById) throw new HttpException(409, "IUser doesn't exist");

    return updateUserById;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const deleteUserById: IUser = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "IUser doesn't exist");

    return deleteUserById;
  }
}
