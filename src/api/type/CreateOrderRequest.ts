import { CreateOrderRequestDetail } from './CreateOrderRequestDetail';

export type CreateOrderRequest = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  company: string;
  zipCode: string;
  city: string;
  country: string;
  carrierKey: string;
  status: string;
  details: CreateOrderRequestDetail[];
};
