import { PartialType } from '@nestjs/mapped-types';
import { CreatePhoneDto } from './create-phone.dto';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePhoneDto extends PartialType(CreatePhoneDto) {
  @ApiProperty({
    description: 'Código internacional do país (ex: 55 para Brasil)',
    example: 55,
  })
  @IsNumber({}, { message: 'O código do país deve ser um número.' })
  @IsNotEmpty({ message: 'O código do país é obrigatório.' })
  @IsPositive({ message: 'O código do país deve ser um valor positivo.' })
  country_code: number;

  @ApiProperty({
    description: 'Código de área / DDD (ex: 11 para São Paulo)',
    example: 11,
  })
  @IsNumber({}, { message: 'O código de área deve ser um número.' })
  @IsNotEmpty({ message: 'O código de área é obrigatório.' })
  @IsPositive({ message: 'O código de área deve ser um valor positivo.' })
  area_code: number;

  @ApiProperty({
    description: 'Número do telefone (apenas números)',
    example: 999999999,
  })
  @IsNumber({}, { message: 'O número do telefone deve ser um número.' })
  @IsNotEmpty({ message: 'O número do telefone é obrigatório.' })
  @IsPositive({ message: 'O número do telefone deve ser um valor positivo.' })
  number: number;
}
