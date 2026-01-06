import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ModeOfOperation {
  SELF = 'SELF',
  JOINT = 'JOINT',
  EITHER_OR_SURVIVOR = 'EITHER_OR_SURVIVOR',
  FORMER_OR_SURVIVOR = 'FORMER_OR_SURVIVOR',
}

@Entity('dpmaster')
export class DPMaster {


  @PrimaryColumn({ name: 'account_number' })
  accountNumber: string; // FK → accounts.account_number


  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  opening_balance: number;

  @Column({ type: 'date' })
  opening_date: Date;


  @Column({
    type: 'enum',
    enum: ModeOfOperation,
    default: ModeOfOperation.SELF,
  })
  mode_of_operation: ModeOfOperation;

  @Column({ nullable: true })
  nominee_name: string;

  @Column({ nullable: true })
  nominee_relation: string;

  @Column({ nullable: true })
  nominee_age: number;


  @Column({ type: 'decimal', precision: 15, scale: 2 })
  min_balance: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  interest_rate: number;


  @Column({ type: 'int', nullable: true })
  tenure_months: number;

  @Column({ type: 'date', nullable: true })
  maturity_date: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  maturity_amount: number;


  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
