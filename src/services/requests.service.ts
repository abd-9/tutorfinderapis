import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { ITutor, IUser } from '@interfaces/users.interface';
import { TutorModel, UserModel } from '@models/users.model';
import { Container } from 'typedi';
import { UserService } from './users.service';
import { RESPONSE_STATUS } from '@exceptions/httpException';
import { IReview } from '@/models/review.model';
import RequestModel, { IRequest, ISession, REQUEST_REPETITION, REQUEST_STATUS, SESSION_STATUS, SessionModel } from '@/models/request.model';
import moment from 'moment';
import { FilterQuery } from 'mongoose';

@Service()
export class RequestService {
  // public async findAllTutor(): Promise<ITutor[]> {
  //   const tutors: ITutor[] = await TutorModel.find();
  //   return tutors;
  // }
  // public async findTutorById(tutorId: string): Promise<ITutor> {
  //   const findTutor: ITutor = await TutorModel.findOne({ _id: tutorId }).populate({
  //     path: 'user',
  //     model: 'User',
  //   });
  //   if (!findTutor) throw new HttpException(409, "Tutor doesn't exist");
  //   return findTutor;
  // }
  // public async createTutor(tutorData: ITutor): Promise<ITutor> {
  //   const findUser: ITutor = await TutorModel.findOne({ email: tutorData.email });
  //   if (findUser) throw new HttpException(409, `This email ${tutorData.email} already exists1`);
  //   const newUser: IUser = {
  //     email: tutorData.email,
  //     password: tutorData.password,
  //     name: tutorData.name,
  //   };
  //   const createdUser = await this.userServices.createUser(newUser);
  //   try {
  //     const createUserData: ITutor = await TutorModel.create({ ...tutorData, user: createdUser._id });
  //     return createUserData;
  //   } catch (ex) {
  //     this.userServices.deleteUser(createdUser._id);
  //     throw new HttpException(409, ex.message);
  //   }
  // }
  // public async updateTutor(tutorId: string, tutorData: ITutor): Promise<ITutor> {
  //   if (tutorData.email) {
  //     const findUser: IUser = await UserModel.findOne({ email: tutorData.email }).populate({
  //       path: 'user',
  //       model: 'User',
  //     });
  //     if (findUser && findUser._id != tutorId) throw new HttpException(409, `This email ${tutorData.email} already exists`);
  //     else {
  //       await UserModel.findByIdAndUpdate(tutorData.userId, { email: tutorData.email });
  //     }
  //   }
  //   // TODO: have to check if email will be added to the tutor modal then i have to remove the attributes form the object
  //   const updatedTutorById: ITutor = await TutorModel.findByIdAndUpdate(tutorId, { ...tutorData }).populate({
  //     path: 'user',
  //     model: 'User',
  //   });
  //   if (!updatedTutorById) throw new HttpException(409, "Turtor doesn't exist");
  //   return updatedTutorById;
  // }
  public async createSessions(requestData: IRequest): Promise<ISession[]> {
    try {
      const requestId = requestData._id;
      if (requestData.repetition == REQUEST_REPETITION.ONCE) {
        const newSession = new SessionModel({
          request: requestId,
          startDateTime: requestData.startDateTime,
          endDateTime: requestData.endDateTime,
          status: SESSION_STATUS.PENDING,
        });

        await newSession.save();
        return [newSession];
      }

      if (requestData.repetition == REQUEST_REPETITION.DAILY) {
        const sessions = [];
        const currentDateTime = new Date(requestData.startDateTime);
        const repetitionEndDateTime = requestData.endDateTime;
        while (currentDateTime <= repetitionEndDateTime) {
          const newSession = new SessionModel({
            request: requestId,
            startDateTime: currentDateTime,
            endDateTime: moment(currentDateTime).set({ hour: requestData.endDateTime.getHours(), minutes: requestData.endDateTime.getMinutes() }),
            status: SESSION_STATUS.PENDING,
          });

          sessions.push(newSession);
          currentDateTime.setDate(currentDateTime.getDate() + 1); // Move to the next day
        }

        const createdSessions = await SessionModel.insertMany(sessions);
        return createdSessions;
      }

      if (requestData.repetition == REQUEST_REPETITION.WEEKLY) {
        const sessions = [];
        const currentDateTime = new Date(requestData.startDateTime);
        const repetitionEndDateTime = requestData.endDateTime;
        while (currentDateTime <= repetitionEndDateTime) {
          const newSession = new SessionModel({
            request: requestId,
            startDateTime: currentDateTime,
            endDateTime: moment(currentDateTime).set({ hour: requestData.endDateTime.getHours(), minutes: requestData.endDateTime.getMinutes() }),
            status: SESSION_STATUS.PENDING,
          });

          sessions.push(newSession);
          currentDateTime.setDate(currentDateTime.getDate() + 7); // Move to the next week
        }

        const createdSessions = await SessionModel.insertMany(sessions);
        return createdSessions;
      }
    } catch (error) {
      throw new HttpException(RESPONSE_STATUS.InternalServerError, error.message);
    }
  }
  public async getMyRequestsByStatus(objectId: string, requestStatus?: REQUEST_STATUS): Promise<IRequest[]> {
    try {
      const query: FilterQuery<IRequest> = {
        $and: [{ $or: [{ student: objectId }, { tutor: objectId }] }],
      };

      if (requestStatus) {
        query.$and.push({ status: requestStatus });
      }

      const requests = await RequestModel.find(query)
        .populate('sessions')
        .populate({
          path: 'student',
          populate: {
            path: 'user',
            model: 'User',
            select: 'name',
          },
        });

      // const formattedRequests = requests.map(request => {
      //   const formattedRequest = {
      //     _id: request._id,
      //     ...request,
      //     sessions: request.sessions,
      //   };
      //   return formattedRequest;
      // });
      return requests;
    } catch (error) {
      throw new HttpException(RESPONSE_STATUS.InternalServerError, error.message);
    }
  }
  public async updateRequestStatus(requestId: string, requestStatus?: REQUEST_STATUS): Promise<IRequest> {
    try {
      const request = await RequestModel.findByIdAndUpdate(requestId, { status: requestStatus })
        .populate('sessions')
        .populate({
          path: 'student',
          populate: {
            path: 'user',
            model: 'User',
            select: 'name',
          },
        });

      return request;
    } catch (error) {
      throw new HttpException(RESPONSE_STATUS.InternalServerError, error.message);
    }
  }
}
