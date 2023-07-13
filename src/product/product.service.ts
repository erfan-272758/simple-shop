import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductBody, ProductQuery } from 'DTO/product/incoming.dto';
import { Product, ProductDocument } from 'models/product.model';
import { User, UserDocument } from 'models/user.model';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async create(user: UserDocument, body: ProductBody) {
    const product = await this.productModel.create({
      ...body,
      owner: user._id,
    });

    return { data: product };
  }
  async getAll(user: UserDocument, { skip, limit }: ProductQuery) {
    const products = await this.productModel.find(
      { owner: user._id },
      { description: 1, title: 1 },
      {
        sort: {
          createdAt: -1,
        },
        skip,
        limit,
      },
    );

    return { data: products };
  }
}
