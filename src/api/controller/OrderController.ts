import {
  Body,
  Controller,
  Logger,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { TigerService } from '../../client/service/TigerService';
import { OrderService } from '../../db/service/OrderService';
import { OrderCreationErrorFilter } from '../filter/OrderCreationErrorFilter';
import { TigerCreateOrderErrorFilter } from '../filter/TigerCreateOrderErrorFilter';
import { UnknownCarrierErrorFilter } from '../filter/UnknownCarrierErrorFilter';
import { UnknownCountryErrorFilter } from '../filter/UnknownCountryErrorFilter';
import { TokenAuthGuard } from '../guard/TokenAuthGuard';
import { ConvertOrderService } from '../service/ConvertOrderService';
import { CreateOrderRequest } from '../type/CreateOrderRequest';

@Controller('orders')
@UseGuards(TokenAuthGuard)
@UseFilters(
  UnknownCountryErrorFilter,
  UnknownCarrierErrorFilter,
  OrderCreationErrorFilter,
  TigerCreateOrderErrorFilter,
)
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(
    private readonly convertOrderService: ConvertOrderService,
    private readonly orderService: OrderService,
    private readonly tigerService: TigerService,
  ) {}

  /**
   * Recieves an order, saves it and sends to the Tiger API.
   * @param request Representation of the received order.
   */
  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    this.logger.log('Received order #' + request.id, OrderController.name);

    const order = await this.orderService.createOrder(
      this.convertOrderService.createOrderRequestToOrder(request),
    );

    await this.tigerService.createOrder(
      this.convertOrderService.orderToTigerCreateOrderRequest(order),
    );
  }
}
