export type PhoneDocument = Phone & Document;

@Schema({ timestamps: true }) // Cria automaticamente campos 'createdAt' e 'updatedAt'
export class Phone {
  @Prop({ required: true })
  brand: string; // Ex: Apple, Samsung

  @Prop({ required: true })
  model: string; // Ex: iPhone 15, Galaxy S24

  @Prop({ required: true })
  price: number;

  @Prop()
  color: string;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
