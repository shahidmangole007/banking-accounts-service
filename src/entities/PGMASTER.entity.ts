import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PigmyCollectionFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

@Entity('pgmaster')
export class PGMaster {


  @PrimaryColumn({ name: 'account_number' })
  accountNumber: string; // FK → accounts.account_number
 
  
  @Column({ name: 'agent_code' })
  agentCode: string; // Pigmy agent ID

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  daily_amount: number; // Daily collection amount

  @Column({
    type: 'enum',
    enum: PigmyCollectionFrequency,
    default: PigmyCollectionFrequency.DAILY,
  })
  collection_frequency: PigmyCollectionFrequency;

  @Column({ type: 'int', nullable: true })
  tenure_months: number;

  @Column({ type: 'date', nullable: true })
  maturity_date: Date;


  @Column({ default: true })
  is_active: boolean;


  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
