import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhoneDocument = Phone & Document;

@Schema({ timestamps: true })
export class Phone {
  @Prop({ required: true })
  country_code: number;

  @Prop({ required: true })
  area_code: number;

  @Prop({ required: true })
  number: number;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
