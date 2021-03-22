import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './Order';

/**
 * Database representation of an order item.
 */
@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  weight: number;

  @Column()
  eanCode: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
