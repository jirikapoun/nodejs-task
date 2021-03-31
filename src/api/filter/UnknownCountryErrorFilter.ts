import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { AppError } from '../../db/entity/AppError';
import { AppErrorService } from '../../db/service/AppErrorService';
import { UnknownCountryError } from '../error/UnknownCountryError';

@Catch(UnknownCountryError)
export class UnknownCountryErrorFilter
  extends BaseExceptionFilter
  implements ExceptionFilter<UnknownCountryError> {
  constructor(
    private readonly appErrorService: AppErrorService,
    host: HttpAdapterHost,
  ) {
    super(host.httpAdapter);
  }

  catch(error: UnknownCountryError, host: ArgumentsHost) {
    try {
      const requestBody = host.switchToHttp().getRequest().body;
      const appError = new AppError();
      appError.name = UnknownCountryError.name;
      appError.orderId = requestBody.id;
      appError.error = JSON.stringify(error);
      appError.request = JSON.stringify(requestBody);
      this.appErrorService.saveError(appError);
    } finally {
      super.catch(
        new BadRequestException('Unknown country: ' + error.country),
        host,
      );
    }
  }
}
