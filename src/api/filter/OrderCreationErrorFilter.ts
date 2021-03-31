import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { AppError } from '../../db/entity/AppError';
import { OrderCreationError } from '../../db/error/OrderCreationError';
import { AppErrorService } from '../../db/service/AppErrorService';

@Catch(OrderCreationError)
export class OrderCreationErrorFilter
  extends BaseExceptionFilter
  implements ExceptionFilter<OrderCreationError> {
  constructor(
    private readonly appErrorService: AppErrorService,
    host: HttpAdapterHost,
  ) {
    super(host.httpAdapter);
  }

  catch(error: OrderCreationError, host: ArgumentsHost) {
    try {
      const requestBody = host.switchToHttp().getRequest().body;
      const appError = new AppError();
      appError.name = OrderCreationError.name;
      appError.orderId = requestBody.id;
      appError.error = JSON.stringify(error);
      appError.request = JSON.stringify(requestBody);
      this.appErrorService.saveError(appError);
    } finally {
      super.catch(
        new InternalServerErrorException('Error saving order to database'),
        host,
      );
    }
  }
}
