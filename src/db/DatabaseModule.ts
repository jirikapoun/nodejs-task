import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppError } from './entity/AppError';
import { Order } from './entity/Order';
import { OrderItem } from './entity/OrderItem';
import { AppErrorService } from './service/AppErrorService';
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
      entities: [AppError, Order, OrderItem],
    }),
    TypeOrmModule.forFeature([AppError, Order]),
  ],
  providers: [AppErrorService, OrderService],
  exports: [AppErrorService, OrderService],
})
export class DatabaseModule {}
