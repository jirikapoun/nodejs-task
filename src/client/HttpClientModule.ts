import { HttpModule, Module } from '@nestjs/common';
import { PartnerService } from './service/PartnerService';
import { TigerService } from './service/TigerService';

/**
 * Provides interface for requesting other HTTP services.
 */
@Module({
  imports: [HttpModule],
  providers: [PartnerService, TigerService],
  exports: [PartnerService, TigerService],
})
export class HttpClientModule {}
