import { Injectable } from '@nestjs/common';
import { TigerCreateOrderRequest } from '../../client/type/TigerCreateOrderRequest';
import { config } from '../../config';
import { Order } from '../../db/entity/Order';
import { OrderItem } from '../../db/entity/OrderItem';
import { CreateOrderRequest } from '../type/CreateOrderRequest';
import { CreateOrderRequestDetail } from '../type/CreateOrderRequestDetail';
import { ConvertCarrierService } from './ConvertCarrierService';
import { ConvertCountryService } from './ConvertCountryService';

/**
 * Helper class for order-related object conversions.
 */
@Injectable()
export class ConvertOrderService {
  constructor(
    private readonly convertCarrierService: ConvertCarrierService,
    private readonly convertCountryService: ConvertCountryService,
  ) {}

  createOrderRequestToOrder(request: CreateOrderRequest): Order {
    const order = new Order();
    order.orderId = request.id;
    order.fullName = request.fullName;
    order.email = request.email;
    order.phone = request.phone;
    order.addressLine1 = request.addressLine1;
    order.addressLine2 = request.addressLine2;
    order.company = request.company;
    order.zipCode = request.zipCode;
    order.city = request.city;
    order.country = request.country;
    order.carrierKey = request.carrierKey;
    order.status = request.status;
    order.items = request.details.map(this.createOrderRequestDetailToOrderItem);
    return order;
  }

  orderToTigerCreateOrderRequest(order: Order): TigerCreateOrderRequest {
    return {
      OrderID: order.orderId,
      InvoiceSendLater: config.invoiceSendLater,
      Issued: order.createdAt.toISOString(),
      OrderType: config.orderType,
      Shipping: {
        CarrierID: this.convertCarrierService.carrierKeyToCarrierID(
          order.carrierKey,
        ),
        DeliveryAddress: {
          AddressLine1: order.addressLine1,
          AddressLine2: order.addressLine2,
          City: order.city,
          Company: order.company,
          CountryCode: this.convertCountryService.countryToCountryCode(
            order.country,
          ),
          Email: order.email,
          PersonName: order.fullName,
          Phone: order.phone,
          State: config.state,
          Zip: order.zipCode,
        },
      },
      Products: order.items.map(this.orderItemToTigerCreateOrderRequestProduct),
    };
  }

  private createOrderRequestDetailToOrderItem(
    detail: CreateOrderRequestDetail,
  ): OrderItem {
    const item = new OrderItem();
    item.productId = detail.productId;
    item.name = detail.name;
    item.quantity = detail.quantity;
    item.weight = detail.weight;
    item.eanCode = detail.eanCode;
    return item;
  }

  private orderItemToTigerCreateOrderRequestProduct(orderItem: OrderItem) {
    return {
      Barcode: orderItem.eanCode,
      OPTProductID: orderItem.eanCode,
      Qty: orderItem.quantity,
    };
  }
}
