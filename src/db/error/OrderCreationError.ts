import { Order } from '../entity/Order';

export class OrderCreationError {
  constructor(public readonly order: Order, public readonly cause: Error) {}
}
