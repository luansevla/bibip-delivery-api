import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Phone, PhoneDocument } from './schema/phone.schema';

@Injectable()
export class PhoneService {
  constructor(
    @InjectModel(Phone.name) private phoneModel: Model<PhoneDocument>,
  ) {}

  async create(createPhoneDto: any): Promise<Phone> {
    const createdPhone = new this.phoneModel(createPhoneDto);
    return createdPhone.save();
  }

  async findAll(): Promise<Phone[]> {
    return this.phoneModel.find().exec();
  }

  async findOne(id: string): Promise<Phone> {
    const phone = await this.phoneModel.findById(id).exec();
    if (!phone) {
      throw new NotFoundException(`Telefone com ID ${id} não encontrado`);
    }
    return phone;
  }

  async update(id: string, updatePhoneDto: any): Promise<Phone> {
    const updatedPhone = await this.phoneModel
      .findByIdAndUpdate(id, updatePhoneDto, { new: true }) // { new: true } retorna o objeto já atualizado
      .exec();

    if (!updatedPhone) {
      throw new NotFoundException(`Telefone com ID ${id} não encontrado`);
    }
    return updatedPhone;
  }

  async remove(id: string): Promise<any> {
    const result = await this.phoneModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Telefone com ID ${id} não encontrado`);
    }
    return { deleted: true };
  }
}
