import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema({ timestamps: true })
export class Item {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 1 })
  quantity: number;

  @Prop({ required: true })
  code: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
