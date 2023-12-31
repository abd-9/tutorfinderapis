import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { ITutor, IUser, USER_TYPE } from '@interfaces/users.interface';
import { TutorModel, UserModel } from '@models/users.model';
import { Container } from 'typedi';
import { UserService } from './users.service';
import { RESPONSE_STATUS } from '@exceptions/httpException';
import { IReview } from '@/models/review.model';
import moment from 'moment';

@Service()
export class TutorService {
  public userServices = Container.get(UserService);

  public async findAllTutor(): Promise<ITutor[]> {
    const tutors: ITutor[] = await TutorModel.find()
      .populate({
        path: 'user',
        model: 'User',
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name',
        },
      });
    return tutors;
  }

  public async findTutorById(tutorId: string): Promise<ITutor> {
    const findTutor: ITutor = await TutorModel.findOne({ _id: tutorId })
      .populate({
        path: 'user',
        model: 'User',
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name',
        },
      });
    if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

    return findTutor;
  }
  public async findTutorByUserId(userId: string): Promise<ITutor> {
    const findTutor: ITutor = await TutorModel.findOne({ user: userId });
    if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");

    return findTutor;
  }

  public async createTutor(tutorData: ITutor): Promise<ITutor> {
    const findUser: ITutor = await TutorModel.findOne({ email: tutorData.email });
    if (findUser) throw new HttpException(409, `This email ${tutorData.email} already exists1`);
    const newUser: IUser = {
      email: tutorData.email,
      password: tutorData.password,
      type: USER_TYPE.TUTOR,
      name: tutorData.name,
    };
    const createdUser = await this.userServices.createUser(newUser);
    try {
      const createUserData: ITutor = await TutorModel.create({ ...tutorData, user: createdUser._id });
      return createUserData;
    } catch (ex) {
      this.userServices.deleteUser(createdUser._id);
      throw new HttpException(409, ex.message);
    }
  }

  public async updateTutor(tutorId: string, tutorData: ITutor): Promise<ITutor> {
    if (tutorData.email) {
      const findUser: IUser = await UserModel.findOne({ email: tutorData.email }).populate({
        path: 'user',
        model: 'User',
      });
      if (findUser && findUser._id != tutorId) throw new HttpException(409, `This email ${tutorData.email} already exists`);
      else {
        await UserModel.findByIdAndUpdate(tutorData.userId, { email: tutorData.email });
      }
    }
    if (tutorData.name) await UserModel.findByIdAndUpdate(tutorData.userId, { name: tutorData.name });

    // TODO: have to check if email will be added to the tutor modal then i have to remove the attributes form the object
    const updatedTutorById: ITutor = await TutorModel.findByIdAndUpdate(tutorId, { ...tutorData }, { new: true })
      .populate({
        path: 'user',
        model: 'User',
      })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          model: 'User',
          select: 'name', // Only select the 'name' field from the 'User' model
        },
      });
    if (!updatedTutorById) throw new HttpException(409, "Turtor doesn't exist");

    return updatedTutorById;
  }
  public async addTutorReview(tutorId: string, tutorReview: IReview): Promise<IReview[]> {
    const findTutor = await TutorModel.findOne({ _id: tutorId });
    if (!findTutor) throw new HttpException(RESPONSE_STATUS.DoesNotExist, `Tutor dose not exist.`);
    else {
      tutorReview.createdDate = new Date();
      findTutor.reviews.push(tutorReview);
      await findTutor.save();
    }
    // TODO: pagination
    return findTutor.reviews;
  }

  public async deleteUser(userId: string): Promise<IUser> {
    const deleteUserById: IUser = await UserModel.findByIdAndDelete(userId);
    if (!deleteUserById) throw new HttpException(409, "IUser doesn't exist");

    return deleteUserById;
  }
}
