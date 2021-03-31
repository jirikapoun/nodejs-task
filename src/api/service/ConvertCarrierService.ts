import { Injectable } from '@nestjs/common';
import { config } from '../../config';
import { UnknownCarrierError } from '../error/UnknownCarrierError';

/**
 * Helper class for carrier-related value conversions.
 */
@Injectable()
export class ConvertCarrierService {
  carrierKeyToCarrierID(carrierKey: string): number {
    const carrierID = config.carrierIDs[carrierKey];
    if (!carrierID) {
      throw new UnknownCarrierError(carrierKey);
    } else {
      return carrierID;
    }
  }
}
