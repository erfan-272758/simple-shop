import { Injectable } from '@nestjs/common';
import { ProductBody, ProductQuery } from 'DTO/product/incoming.dto';
import { UserDocument } from 'models/user.model';

@Injectable()
export class ProductService {
  async create(user: UserDocument, body: ProductBody) {}
  async getAll(user: UserDocument, quey: ProductQuery) {}
}
