import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entity/Order';
import { OrderService } from './OrderService';

describe('OrderService', () => {
  let orderService: OrderService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          synchronize: true,
          logging: true,
          entities: [Order],
        }),
        TypeOrmModule.forFeature([Order]),
      ],
      providers: [OrderService],
    }).compile();

    orderService = app.get<OrderService>(OrderService);
  });

  it('should save and retrieve testing order', () => {
    const order: Order = new Order();
    order.fullName = 'Frantisek Prihoda';
    order.email = 'frantisek@prihoda.cz';
    order.addressLine1 = 'Na Hurce 512';
    order.city = 'Domasov';
    order.zipCode = '432 19';
    return orderService
      .createOrder(order)
      .then((savedOrder) => {
        expect(typeof savedOrder.id).toBe('number');
        order.id = savedOrder.id;
        return orderService.getOrder(savedOrder.id);
      })
      .then((retrievedOrder) => {
        expect(retrievedOrder).toEqual(order);
      });
  });
});
