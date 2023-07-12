import { Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
export class UserSignupBody {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @Length(8, 20)
  password: string;
}

export class UserLoginBody {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @Length(8, 20)
  password: string;
}
