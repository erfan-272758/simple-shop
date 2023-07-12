import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './common/pipe/validation.pipe';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { GLOBAL } from './global';
import { User, UserSchema } from 'models/user.model';
import { Product, ProductSchema } from 'models/product.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: GLOBAL.env.DB_URL,
        dbName: 'simple-shop',
      }),
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: GLOBAL.env.APP_JWT_SECRET,
        signOptions: { expiresIn: '90d' },
      }),
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_PIPE, useClass: ValidationPipe }],
})
export class AppModule {}
