import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { EnvDto } from 'DTO/common/env.dto';
import { join } from 'path';
import { config } from 'dotenv';

export default function loadEnv() {
  // set envs from .env.local
  const path = join('.env.local');
  config({ path });

  const env = plainToInstance(EnvDto, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(env);

  if (errors.length > 0) throw new Error(errors.toString());

  return env;
}
