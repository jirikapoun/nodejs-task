import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PartnerService } from '../../client/service/PartnerService';
import { TigerService } from '../../client/service/TigerService';
import { OrderService } from '../../db/service/OrderService';

@Injectable()
export class SyncOrderStateService {
  private readonly logger = new Logger(SyncOrderStateService.name);

  constructor(
    private readonly orderService: OrderService,
    private readonly tigerService: TigerService,
    private readonly partnerService: PartnerService,
  ) {}

  /**
   * Checks for changes in state for unfinished orders and performs the required actions if the state changed.
   */
  @Cron(CronExpression.EVERY_MINUTE)
  async syncOrderStates() {
    this.logger.verbose('Synchronizing order states');
    const orders = await this.orderService.getUnfinishedOrders();
    await orders.forEach(async (order) => {
      const response = await this.tigerService.getOrderState(order.orderId);

      if (order.status != response.State) {
        this.logger.log(
          'Updating state for order #' +
            order.orderId +
            ' from ' +
            order.status +
            ' to ' +
            response.State,
        );
        order.status = response.State;
        await this.partnerService.updateOrderState(order.orderId, order.status);
        await this.orderService.updateOrder(order);
      }
    });
  }
}
