import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { config } from '../../config';

/**
 * Implements token authorization for the app's HTTP API.
 */
@Injectable()
export class TokenAuthGuard implements CanActivate {
  private readonly logger = new Logger(TokenAuthGuard.name);
  private readonly headerName = config.authHeaderName.toLowerCase();

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.headers[this.headerName];
    const tokenValid = token == process.env.API_TOKEN;
    if (!tokenValid) {
      this.logger.warn('Invalid auth token: ' + token);
    }
    return tokenValid;
  }
}
