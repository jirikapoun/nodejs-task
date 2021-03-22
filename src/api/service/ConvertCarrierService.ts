import { Injectable } from '@nestjs/common';
import { config } from '../../config';

/**
 * Helper class for carrier-related value conversions.
 */
@Injectable()
export class ConvertCarrierService {
  carrierKeyToCarrierID(carrierKey: string): number {
    const carrierID = config.carrierIDs[carrierKey];
    if (!carrierID) {
      throw new Error('Unknown carrier: "' + carrierKey + '"');
    } else {
      return carrierID;
    }
  }
}
