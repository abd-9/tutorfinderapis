import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import Container, { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { IUser, USER_TYPE } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';
import { StudentService } from './students.service';
import { TutorService } from './tutors.service';

const createToken = (user: IUser, tutorId: string, studentId: string): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id, tutorId, studentId };
  const expiresIn: number = 60 * 60000000;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public studentServices = Container.get(StudentService);
  public tutorServices = Container.get(TutorService);

  public async signup(userData: IUser): Promise<IUser> {
    const findUser: IUser = await UserModel.findOne({ email: userData.email });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: IUser = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: IUser): Promise<{ cookie: string; findUser: IUser; token: string; tutorId?: string; studentId?: string }> {
    const findUser: IUser = await UserModel.findOne({ email: userData.email });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);
    let tutorId = '';
    let studentId = '';

    if (findUser.type == USER_TYPE.STUDENT) {
      studentId = (await this.studentServices.findStudentByUserId(findUser._id))._id;
    }
    if (findUser.type == USER_TYPE.TUTOR) {
      tutorId = (await this.tutorServices.findTutorByUserId(findUser._id))._id;
    }
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password is not matching');

    const tokenData = createToken(findUser, tutorId, studentId);

    const cookie = createCookie(tokenData);

    return { cookie, findUser, studentId, tutorId, token: tokenData.token };
  }

  public async logout(userData: IUser): Promise<IUser> {
    const findUser: IUser = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
