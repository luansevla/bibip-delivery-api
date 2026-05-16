import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: 'Valor do item em centavos (ex: 5000 para R$ 50,00)',
    example: 5000,
  })
  @IsNumber(
    {},
    { message: 'O valor (amount) deve ser um número inteiro em centavos.' },
  )
  @IsNotEmpty({ message: 'O valor (amount) é obrigatório.' })
  @IsPositive({ message: 'O valor deve ser maior que zero.' })
  amount: number;

  @ApiProperty({
    description: 'Descrição ou nome do produto',
    example: 'Camiseta Geek Dev',
  })
  @IsString({ message: 'A descrição deve ser um texto.' })
  @IsNotEmpty({ message: 'A descrição é obrigatória.' })
  description: string;

  @ApiProperty({
    description: 'Quantidade de itens comprados',
    example: 1,
    default: 1,
  })
  @IsNumber({}, { message: 'A quantidade deve ser um número.' })
  @IsNotEmpty({ message: 'A quantidade é obrigatória.' })
  @Min(1, { message: 'A quantidade mínima deve ser 1.' })
  quantity: number;

  @ApiProperty({
    description: 'Código de referência interna do produto',
    example: '859',
  })
  @IsString({ message: 'O código deve ser um texto.' })
  @IsNotEmpty({ message: 'O código é obrigatório.' })
  code: string;
}
