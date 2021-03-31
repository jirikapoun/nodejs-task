import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { AppError } from '../../db/entity/AppError';
import { AppErrorService } from '../../db/service/AppErrorService';
import { UnknownCarrierError } from '../error/UnknownCarrierError';

@Catch(UnknownCarrierError)
export class UnknownCarrierErrorFilter
  extends BaseExceptionFilter
  implements ExceptionFilter<UnknownCarrierError> {
  constructor(
    private readonly appErrorService: AppErrorService,
    host: HttpAdapterHost,
  ) {
    super(host.httpAdapter);
  }

  catch(error: UnknownCarrierError, host: ArgumentsHost) {
    try {
      const requestBody = host.switchToHttp().getRequest().body;
      const appError = new AppError();
      appError.name = UnknownCarrierError.name;
      appError.orderId = requestBody.id;
      appError.error = JSON.stringify(error);
      appError.request = JSON.stringify(requestBody);
      this.appErrorService.saveError(appError);
    } finally {
      super.catch(
        new BadRequestException('Unknown carrier: ' + error.carrierKey),
        host,
      );
    }
  }
}
