import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index} from 'typeorm';

export enum AccountNature {
  // Deposit / Savings types
  SB = 'SB', // Savings Bank
  CA = 'CA', // Current Account
  TD = 'TD', // Term Deposit (FD / RD)
  IV = 'IV', // Investment Deposit

  // Pigmy / Agent
  PG = 'PG', 
  AG = 'AG', 

  // Loan types
  LN = 'LN', 
  CC = 'CC', 

  // Share 
  SH = 'SH', 

  // Locker
  LK = 'LK', 

  // Accounting (Non-customer)
  GL = 'GL'
}


export enum InterestType {
  SIMPLE = 'SIMPLE',
  COMPOUND = 'COMPOUND',
}

export enum InterestFrequency {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export enum InterestCalcBasis {
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
}

export enum RoundingRule {
  NEAREST = 'NEAREST',
  FLOOR = 'FLOOR',
  CEIL = 'CEIL',
}



@Entity('scheme_master')
@Index(['s_appl'], { unique: true }) // Scheme code must be unique
export class SchemeMaster {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 's_acnotype', type: 'enum', enum: AccountNature })
  s_acnotype: AccountNature; // SB / TD / LN / PG / LK

  @Column({ name: 's_appl', type: 'int' })
  s_appl: number; // Scheme Code (101, 201, 501...)

  @Column({ name: 'scheme_name' })
  scheme_name: string;

  @Column({ name: 'scheme_shortname' })
  scheme_shortname: string;

  @Column({ name: 'scheme_gl_acno' })
  scheme_gl_acno: string; // Principal GL

  @Column({ name: 'scheme_int_acno' })
  scheme_int_acno: string; // Interest GL

  @Column({ name: 'account_type', type: 'int' })
  account_type: number; // Internal category (deposit / loan / locker)

  /**
   * ===== ACCOUNT BEHAVIOR RULES =====
   */

  @Column({ default: true })
  allow_credit: boolean;

  @Column({ default: true })
  allow_debit: boolean;

  @Column({ default: false })
  allow_overdraft: boolean;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  min_balance: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  max_balance: number;

  /**
   * ===== INTEREST CONFIGURATION =====
   */

  @Column({ default: false })
  interest_applicable: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  interest_rate: number;

  @Column({
    type: 'enum',
    enum: InterestType,
    nullable: true,
  })
  interest_type: InterestType;

  @Column({
    type: 'enum',
    enum: InterestFrequency,
    nullable: true,
  })
  interest_frequency: InterestFrequency;

  @Column({
    type: 'enum',
    enum: InterestCalcBasis,
    nullable: true,
  })
  interest_calc_basis: InterestCalcBasis;

  /**
   * ===== TENURE / MATURITY RULES =====
   */

  @Column({ default: false })
  tenure_required: boolean;

  @Column({ type: 'int', nullable: true })
  min_tenure_months: number;

  @Column({ type: 'int', nullable: true })
  max_tenure_months: number;

  @Column({ default: false })
  premature_allowed: boolean;

  /**
   * ===== ACCOUNTING / LEDGER RULES =====
   */

  @Column({ nullable: true })
  penalty_gl: string;

  @Column({ nullable: true })
  charges_gl: string;

  @Column({ nullable: true })
  interest_posting_gl: string;

  @Column({
    type: 'enum',
    enum: RoundingRule,
    default: RoundingRule.NEAREST,
  })
  rounding_rule: RoundingRule;

  /**
   * ===== STATUS & AUDIT =====
   */

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @Column({ nullable: true })
  created_by: string;
}
