import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhoneModule } from './phone/phone.module';
import { CostumerModule } from './costumer/costumer.module';
import { ItemModule } from './item/item.module';
import { ShippingModule } from './shipping/shipping.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [PhoneModule, CostumerModule, ItemModule, ShippingModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
