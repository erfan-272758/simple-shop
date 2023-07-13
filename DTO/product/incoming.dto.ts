import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';
export class ProductBody {
  @Expose()
  @Length(1, 100)
  title: string;

  @Expose()
  @Length(1, 1000)
  description: string;
}

export class ProductQuery {
  @Expose()
  @IsOptional()
  @IsPositive()
  @IsInt()
  skip: number;

  @Expose()
  @IsOptional()
  @IsPositive()
  @IsInt()
  limit: number;
}
