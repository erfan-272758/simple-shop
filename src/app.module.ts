import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { MongooseModule } from '@nestjs/mongoose';
import { GLOBAL } from './global';
import { User, UserSchema } from 'models/user.model';
import { Product, ProductSchema } from 'models/product.model';
import { JwtModule } from '@nestjs/jwt';
import { MorganModule, MorganInterceptor } from 'nest-morgan';

@Module({
  imports: [
    MorganModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: GLOBAL.env.DB_URL,
        dbName: 'simple-shop',
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: GLOBAL.env.APP_JWT_SECRET,
        signOptions: { expiresIn: '90d' },
      }),
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor('dev'),
    },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
