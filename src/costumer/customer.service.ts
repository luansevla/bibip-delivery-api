import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer, CustomerDocument } from './schema/customer.schema';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return newCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerModel.findById(id).exec();

    // Se o Mongo retornar null, lançamos uma exceção 404
    if (!customer) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }

    return customer;
  }

  // 2. Atualizar dados ou telefones de um cliente por ID
  async update(
    id: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const updatedCustomer = await this.customerModel
      .findByIdAndUpdate(
        id,
        updateCustomerDto,
        { new: true, runValidators: true },
        // { new: true } faz o Mongo retornar o documento já atualizado
        // { runValidators: true } garante que as validações do Schema rodem no update
      )
      .exec();

    if (!updatedCustomer) {
      throw new NotFoundException(
        `Cliente com ID ${id} não encontrado para atualização.`,
      );
    }

    return updatedCustomer;
  }

  async remove(id: string): Promise<{ deleted: boolean; id: string }> {
    const result = await this.customerModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(
        `Cliente com ID ${id} não encontrado para remoção.`,
      );
    }

    // Retorna um feedback limpo confirmando a deleção
    return {
      deleted: true,
      id: id,
    };
  }
}
