import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserLoginBody, UserSignupBody } from 'DTO/auth/incoming.dto';
import { IUserMethods, User, UserDocument } from 'models/user.model';
import { Model, Types } from 'mongoose';
import { sendEmail } from 'src/utils/email';
import { UserState } from 'types/user';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument, UserDocument, IUserMethods>,
    private jwt: JwtService,
  ) {}
  async signup(body: UserSignupBody, req: Request) {
    // create user
    const user = await this.userModel.create(body);

    // create token
    const token = await user.createEmailVerifyToken();
    const link = `${req.protocol}://${req.get(
      'host',
    )}/api/v1/auth/verifyEmail/${user.id}?token=${token}`;

    // save
    await user.save();

    // sendEmail
    const canSend = await sendEmail({
      to: user.email,
      title: 'Verification',
      message: `to verify your account click to below link
      ${link}`,
    });

    if (!canSend) {
      await user.deleteOne();
      throw new InternalServerErrorException('email not send');
    }

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.emailVerifyToken;
    delete userObj.emailVerifyTokenExpire;

    return {
      message: 'user create , please check your email and verify your account',
      data: userObj,
    };
  }
  async login(body: UserLoginBody) {
    const user = await this.userModel.findOne({
      email: body.email,
      state: UserState.Active,
    });
    if (!user || !user.verifyPassword(body.password))
      throw new UnauthorizedException('email or password is wrong');

    // create auth token
    const token = await this.createToken(user.id);

    return {
      data: { user, token },
    };
  }
  async verifyEmail(id: string, token: string) {
    const user = await this.userModel.findOne({
      _id: new Types.ObjectId(id),
      state: UserState.NeedVerifyEmail,
    });
    if (!user || (await user.verifyEmailToken(token)))
      throw new BadRequestException('invalid id and token');

    // successfully verify
    const nUser = this.userModel.findByIdAndUpdate(
      user._id,
      {
        $unset: { emailVerifyToken: '', emailVerifyTokenExpire: '' },
        $set: { state: UserState.Active },
      },
      { new: true },
    );

    const authToken = await this.createToken(nUser.id);

    return {
      message: 'congratulation account successfully verify!',
      data: { user: nUser, token: authToken },
    };
  }

  private createToken(id: string) {
    return this.jwt.signAsync({ id });
  }
}
