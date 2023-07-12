import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Product {
  @Prop({ type: Number, default: 0 })
  sv: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  owner: mongoose.Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  name: string;

  @Prop({ type: String, required: true, trim: true })
  description: string;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ owner: -1 }, { name: 'owner' });
