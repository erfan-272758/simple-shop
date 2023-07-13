import { Expose } from 'class-transformer';
import { IsEmail, IsString, Length } from 'class-validator';
export class UserSignupBody {
  @Expose()
  @Length(1, 100)
  firstName: string;

  @Expose()
  @Length(1, 100)
  lastName: string;

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

export class UserEmailVerifyQuery {
  @Expose()
  @IsString()
  token: string;
}
