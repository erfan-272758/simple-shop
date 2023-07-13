import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Document } from 'mongoose';
import { UserState } from 'types/user';

export interface IUserMethods {
  createEmailVerifyToken: () => Promise<string>;
  verifyEmailToken: (token: string) => Promise<boolean>;
  verifyPassword: (pass: string) => Promise<boolean>;
}

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class User {
  @Prop({ type: Number, default: 0 })
  sv: number;

  @Prop({ type: String, required: true, lowercase: true, trim: true })
  firstName: string;

  @Prop({ type: String, required: true, lowercase: true, trim: true })
  lastName: string;

  @Prop({ type: String, lowercase: true, trim: true, required: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({ type: String, select: false })
  emailVerifyToken?: string;

  @Prop({ type: Date, select: false })
  emailVerifyTokenExpire?: Date;

  @Prop({ type: String, default: UserState.NeedVerifyEmail, enum: UserState })
  state: UserState;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: -1 }, { unique: true, name: 'email' });

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.method<UserDocument>('createEmailVerifyToken', async function () {
  const token = crypto.randomBytes(32).toString('hex');

  this.emailVerifyToken = await bcrypt.hash(token, 8);
  this.emailVerifyTokenExpire = new Date(Date.now() + 5 * 60 * 1000);

  return token;
});

UserSchema.method<UserDocument>('verifyEmailToken', async function (token) {
  return (
    this.emailVerifyToken &&
    this.emailVerifyTokenExpire &&
    this.emailVerifyTokenExpire.getTime() <= Date.now() &&
    (await bcrypt.compare(token, this.emailVerifyToken))
  );
});

UserSchema.method<UserDocument>(
  'verifyPassword',
  async function (pass: string) {
    return await bcrypt.compare(pass, this.password);
  },
);
