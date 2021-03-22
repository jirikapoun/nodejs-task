import { HttpService, Injectable, Logger } from '@nestjs/common';

/**
 * Implements communication with Partner API.
 */
@Injectable()
export class PartnerService {
  private readonly logger = new Logger(PartnerService.name);
  private readonly baseUrl = process.env.CLIENT_PARTNER_URL;
  private readonly token = process.env.CLIENT_PARTNER_TOKEN;

  constructor(private readonly httpService: HttpService) {}

  async updateOrderState(orderId: string, state: string) {
    this.logger.verbose(
      'Updating state for order #' + orderId + ' in Partner API',
    );
    await this.httpService
      .patch(
        this.baseUrl + '/api/orders/' + orderId,
        { state: state },
        {
          headers: { 'X-API-KEY': this.token },
        },
      )
      .toPromise();
  }
}
