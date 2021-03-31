import { Injectable } from '@nestjs/common';
import { config } from '../../config';
import { UnknownCountryError } from '../error/UnknownCountryError';

/**
 * Helper class for country-related value conversions.
 */
@Injectable()
export class ConvertCountryService {
  countryToCountryCode(country: string): string {
    const countryCode = config.countryCodes[country];
    if (!countryCode) {
      throw new UnknownCountryError(country);
    } else {
      return countryCode;
    }
  }
}
