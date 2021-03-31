import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppError } from '../entity/AppError';

/**
 * Provides way to save application errors to database.
 */
@Injectable()
export class AppErrorService {
  private readonly logger = new Logger(AppErrorService.name);

  constructor(
    @InjectRepository(AppError)
    private readonly errorRepository: Repository<AppError>,
  ) {}

  async saveError(error: AppError) {
    this.logger.verbose('Saving error ' + error.name + ' to database');
    return this.errorRepository.save(error);
  }
}
