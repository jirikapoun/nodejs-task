import { Body, Controller, Logger, Post, UseGuards } from '@nestjs/common';
import { TigerService } from '../../client/service/TigerService';
import { OrderService } from '../../db/service/OrderService';
import { TokenAuthGuard } from '../guard/TokenAuthGuard';
import { CreateOrderRequest } from '../type/CreateOrderRequest';
import { ConvertOrderService } from '../service/ConvertOrderService';

@Controller('orders')
@UseGuards(TokenAuthGuard)
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
