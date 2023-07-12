import { IsEnum, IsPort, IsString, IsUrl } from 'class-validator';

export enum Environment {
  Production = 'production',
  Development = 'development',
  Local = 'local',
}

export class EnvDto {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsPort()
  PORT: string;

  @IsUrl()
  HOST: string;

  @IsString()
  DB_URL: string;

  @IsString()
  APP_JWT_SECRET: string;
}
