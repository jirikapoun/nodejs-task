import { Module } from '@nestjs/common';
import { ApiServerModule } from './api/ApiServerModule';
import { SchedulerModule } from './schedule/SchedulerModule';

/**
 * Top-level module of the application.
 */
@Module({
  imports: [ApiServerModule, SchedulerModule],
})
export class AppModule {}
