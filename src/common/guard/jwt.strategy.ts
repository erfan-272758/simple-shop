import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { User, UserDocument } from 'models/user.model';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { GLOBAL } from 'src/global';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: GLOBAL.env.APP_JWT_SECRET,
    });
    this.userModel = userModel;
  }
  async validate(payload: { id: string }) {
    //find user from db and return it
    const user = await this.userModel.findById(payload.id);

    if (!user) throw new UnauthorizedException('User not found');

    return user;
  }
}
