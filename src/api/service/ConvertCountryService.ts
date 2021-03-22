import { Injectable } from '@nestjs/common';
import { config } from '../../config';

/**
 * Helper class for country-related value conversions.
 */
@Injectable()
export class ConvertCountryService {
  countryToCountryCode(country: string): string {
    const countryCode = config.countryCodes[country];
    if (!countryCode) {
      throw new Error('Unknown country: "' + country + '"');
    } else {
      return countryCode;
    }
  }
}
