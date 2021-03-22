import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpClientModule } from '../client/HttpClientModule';
import { DatabaseModule } from '../db/DatabaseModule';
import { SyncOrderStateService } from './service/SyncOrderStateService';

/**
 * Executes periodically scheduled tasks.
 */
@Module({
  imports: [ScheduleModule.forRoot(), HttpClientModule, DatabaseModule],
  providers: [SyncOrderStateService],
})
export class SchedulerModule {}
