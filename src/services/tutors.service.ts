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

  public async updateTutor(tutorId: string, tutorData: ITutor): Promise<ITutor> {
    if (tutorData.email) {
      const findUser: IUser = await UserModel.findOne({ email: tutorData.email });
      if (findUser && findUser._id != tutorId) throw new HttpException(409, `This email ${tutorData.email} already exists`);
      else {
        await TutorModel.findByIdAndUpdate(tutorData.userId, { email: tutorData.email });
      }
    }

    // TODO: have to check if email will be added to the tutor modal then i have to remove the attributes form the object
    const updatedTutorById: ITutor = await TutorModel.findByIdAndUpdate(tutorId, { ...tutorData });
    console.log('Aaaaa', updatedTutorById);
    if (!updatedTutorById) throw new HttpException(409, "Turtor doesn't exist");

    return updatedTutorById;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const deleteUserById: IUser = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "IUser doesn't exist");

    return deleteUserById;
  }
}
