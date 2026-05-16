import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PhoneService } from './phone.service';

@Controller('phones') // Define a rota base como /phones
export class PhoneController {
  constructor(private readonly phoneService: PhoneService) {}

  @Post()
  create(@Body() createPhoneDto: any) {
    return this.phoneService.create(createPhoneDto);
  }

  @Get()
  findAll() {
    return this.phoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.phoneService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePhoneDto: any) {
    return this.phoneService.update(id, updatePhoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.phoneService.remove(id);
  }
}
