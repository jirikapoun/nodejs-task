import { TigerCreateOrderRequestProduct } from './TigerCreateOrderRequestProduct';

export type TigerCreateOrderRequest = {
  OrderID: string; // required
  InvoiceSendLater: boolean; // allways false
  Issued: string; // required; ISO 8601 date-time format
  OrderType: string; // allways "standard";
  Shipping: {
    CarrierID: number; // required; mapped from carriers list
    DeliveryAddress: {
      AddressLine1: string; // required
      AddressLine2?: string; // optional
      City: string; // required
      Company?: string; // optional
      CountryCode: string; // required; ISO 3166-1 alpha-2;
      Email: string; // required
      PersonName: string; // required
      Phone: string; // required
      State: string; // required
      Zip: string; // required
    };
  };
  Products: TigerCreateOrderRequestProduct[];
};
