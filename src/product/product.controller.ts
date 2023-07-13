import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  Query,
  HttpCode,
} from '@nestjs/common';
import { Request } from 'express';
import {
  UserEmailVerifyQuery,
  UserLoginBody,
  UserSignupBody,
} from 'DTO/auth/incoming.dto';
import { ProductService } from './product.service';
import { Protect } from 'src/common/decorator/protect.decorator';
import { RestrictTo } from 'src/common/decorator/restrictTo.decorator';
import { UserState } from 'types/user';
import { User } from 'src/common/decorator/user.decorator';
import { UserDocument } from 'models/user.model';
import { ProductBody, ProductQuery } from 'DTO/product/incoming.dto';

@Controller('/api/v1/product')
@Protect()
@RestrictTo(UserState.Active)
export class ProductController {
  constructor(private service: ProductService) {}

  @Post('/')
  create(@User() user: UserDocument, @Body() body: ProductBody) {
    return this.service.create(user, body);
  }

  @Get('/')
  getAll(@User() user: UserDocument, @Query() query: ProductQuery) {
    return this.service.getAll(user, query);
  }
}
