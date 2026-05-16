import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Phone, PhoneSchema } from '../../phone/schema/phone.schema';

export type CustomerDocument = Customer & Document;

// Criamos uma classe interna temporária para tipar o objeto "phones"
@Schema({ _id: false }) // _id: false evita que o Mongo crie um ID para o objeto phones em si
class CustomerPhones {
  @Prop({ type: PhoneSchema, required: true })
  home_phone: Phone;

  @Prop({ type: PhoneSchema, required: true })
  mobile_phone: Phone;
}

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true }) // Unique garante que não haverá emails duplicados
  email: string;

  @Prop({
    required: true,
    default: 'individual',
    enum: ['individual', 'company'],
  })
  type: string; // Pagar.me aceita 'individual' (CPF) ou 'company' (CNPJ)

  @Prop({ required: true })
  document: string; // CPF ou CNPJ (apenas números)

  // Aqui aninhamos o objeto contendo os dois telefones
  @Prop({ type: CustomerPhones, required: true })
  phones: CustomerPhones;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
