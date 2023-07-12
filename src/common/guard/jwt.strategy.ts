import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UserDocument } from 'models/user.model';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { GLOBAL } from 'src/global';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  userModel: Model<UserDocument>;
  constructor(userModel: Model<UserDocument>) {
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
