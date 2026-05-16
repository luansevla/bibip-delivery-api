import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePhoneDto } from '../../phone/dto/create-phone.dto';

class CustomerPhonesDto {
  @ApiProperty({ type: CreatePhoneDto })
  @ValidateNested()
  @Type(() => CreatePhoneDto)
  @IsNotEmpty()
  home_phone: CreatePhoneDto;

  @ApiProperty({ type: CreatePhoneDto })
  @ValidateNested()
  @Type(() => CreatePhoneDto)
  @IsNotEmpty()
  mobile_phone: CreatePhoneDto;
}

export class CreateCustomerDto {
  @ApiProperty({ example: 'João da Silva' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name: string;

  @ApiProperty({ example: 'joao.silva@email.com' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  email: string;

  @ApiProperty({ example: 'individual', enum: ['individual', 'company'] })
  @IsNotEmpty({ message: 'O tipo (individual/company) é obrigatório.' })
  type: string;

  @ApiProperty({
    description: 'CPF ou CNPJ apenas números',
    example: '12345678909',
  })
  @IsNotEmpty({ message: 'O documento é obrigatório.' })
  document: string;

  @ApiProperty({ type: CustomerPhonesDto })
  @ValidateNested()
  @Type(() => CustomerPhonesDto)
  @IsNotEmpty({ message: 'Os telefones são obrigatórios.' })
  phones: CustomerPhonesDto;
}
