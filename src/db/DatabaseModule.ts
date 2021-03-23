import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/Order';
import { OrderItem } from './entity/OrderItem';
import { OrderService } from './service/OrderService';

/**
 * Implements database operations.
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      logging: !!process.env.DEBUG,
      entities: [Order, OrderItem],
    }),
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class DatabaseModule {}
