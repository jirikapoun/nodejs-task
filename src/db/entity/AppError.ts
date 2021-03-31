import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * Error record which is persisted in database.
 */
@Entity()
export class AppError {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  orderId: string;

  @Column('text')
  error: string;

  @Column({ type: 'text', nullable: true })
  request: string;

  @CreateDateColumn()
  createdAt: Date;
}
