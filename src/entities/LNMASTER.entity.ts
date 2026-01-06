import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LoanInterestType {
  SIMPLE = 'SIMPLE',
  COMPOUND = 'COMPOUND',
}

export enum RepaymentFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
}

export enum LoanStatus {
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  NPA = 'NPA',
}

@Entity('lnmaster')
export class LNMaster {

  @PrimaryColumn({ name: 'account_number' })
  accountNumber: string; // FK → accounts.account_number


  @Column({ type: 'decimal', precision: 15, scale: 2 })
  sanction_amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  disbursed_amount: number;


  @Column({ type: 'decimal', precision: 5, scale: 2 })
  interest_rate: number;

  @Column({
    type: 'enum',
    enum: LoanInterestType,
  })
  interest_type: LoanInterestType;


  @Column({ type: 'int' })
  tenure_months: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  emi_amount: number;

  @Column({
    type: 'enum',
    enum: RepaymentFrequency,
    default: RepaymentFrequency.MONTHLY,
  })
  repayment_frequency: RepaymentFrequency;


  @Column({ type: 'decimal', precision: 15, scale: 2 })
  outstanding_principal: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  outstanding_interest: number;


  @Column({
    type: 'enum',
    enum: LoanStatus,
    default: LoanStatus.ACTIVE,
  })
  loan_status: LoanStatus;

  @Column({ type: 'date' })
  disbursement_date: Date;

  @Column({ type: 'date', nullable: true })
  closure_date: Date;


  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
