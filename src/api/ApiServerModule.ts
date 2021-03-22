import { Module } from '@nestjs/common';
import { HttpClientModule } from '../client/HttpClientModule';
import { DatabaseModule } from '../db/DatabaseModule';
import { OrderController } from './controller/OrderController';
import { ConvertCarrierService } from './service/ConvertCarrierService';
import { ConvertCountryService } from './service/ConvertCountryService';
import { ConvertOrderService } from './service/ConvertOrderService';

/**
 * Provides HTTP API for external services.
 */
@Module({
  imports: [HttpClientModule, DatabaseModule],
  controllers: [OrderController],
  providers: [
    ConvertCarrierService,
    ConvertCountryService,
    ConvertOrderService,
  ],
})
export class ApiServerModule {}
