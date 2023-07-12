import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import { UserState } from 'types/user';

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

  @Prop({ type: String, required: true })
  password: string;

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
