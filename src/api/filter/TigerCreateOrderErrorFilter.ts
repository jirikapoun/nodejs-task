import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { TigerCreateOrderError } from '../../client/error/TigerCreateOrderError';
import { AppError } from '../../db/entity/AppError';
import { AppErrorService } from '../../db/service/AppErrorService';

@Catch(TigerCreateOrderError)
export class TigerCreateOrderErrorFilter
  extends BaseExceptionFilter
  implements ExceptionFilter<TigerCreateOrderError> {
  constructor(
    private readonly appErrorService: AppErrorService,
    host: HttpAdapterHost,
  ) {
    super(host.httpAdapter);
  }

  catch(error: TigerCreateOrderError, host: ArgumentsHost) {
    try {
      const requestBody = host.switchToHttp().getRequest().body;
      const appError = new AppError();
      appError.name = TigerCreateOrderError.name;
      appError.orderId = requestBody.id;
      appError.error = JSON.stringify(error);
      appError.request = JSON.stringify(requestBody);
      this.appErrorService.saveError(appError);
    } finally {
      super.catch(
        new InternalServerErrorException('Error creating order in Tiger API'),
        host,
      );
    }
  }
}
