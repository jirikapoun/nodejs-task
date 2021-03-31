import { HttpService, Injectable, Logger } from '@nestjs/common';
import { TigerCreateOrderError } from '../error/TigerCreateOrderError';
import { TigerCreateOrderRequest } from '../type/TigerCreateOrderRequest';
import { TigerGetOrderStateResponse } from '../type/TigerGetOrderStateResponse';

/**
 * Implements communication with Tiger API.
 */
@Injectable()
export class TigerService {
  private readonly logger = new Logger(TigerService.name);
  private readonly baseUrl = process.env.CLIENT_TIGER_URL;
  private readonly token = TigerService.encodeToken();

  constructor(private readonly httpService: HttpService) {}

  async createOrder(request: TigerCreateOrderRequest) {
    this.logger.verbose('Sending order #' + request.OrderID + ' to Tiger API');
    try {
      request.OrderID = request.OrderID.toString(); // necessary to avoid issues with data types
      await this.httpService
        .post(this.baseUrl + '/api/orders', request, {
          headers: { Authorization: 'Basic ' + this.token },
        })
        .toPromise();
    } catch (error) {
      this.logger.error(
        'Sending order #' +
          request.OrderID +
          ' to Tiger API failed: ' +
          error.message,
      );
      throw new TigerCreateOrderError(request, error);
    }
  }

  async getOrderState(orderId: string): Promise<TigerGetOrderStateResponse> {
    this.logger.verbose(
      'Fetching state of order #' + orderId + ' from Tiger API',
    );
    const response = await this.httpService
      .get<TigerGetOrderStateResponse>(
        this.baseUrl + '/api/orders/' + orderId + '/state',
        {
          headers: { Authorization: 'Basic ' + this.token },
        },
      )
      .toPromise();
    return response.data;
  }

  static encodeToken() {
    const token =
      process.env.CLIENT_TIGER_USERNAME +
      ':' +
      process.env.CLIENT_TIGER_PASSWORD;
    return new Buffer(token).toString('base64');
  }
}
