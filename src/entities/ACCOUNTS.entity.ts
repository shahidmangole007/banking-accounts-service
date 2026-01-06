import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, Index} from 'typeorm';
import { AccountNature } from './SCHEMAST.entity';

export enum AccountStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  CLOSED = 'CLOSED',
}

@Entity('accounts')
@Index(['account_number'], { unique: true })
@Index(['customer_id'])
@Index(['scheme_code'])
export class Account {


  @PrimaryColumn({ name: 'account_number' })
  account_number: string; // Bank-wide unique account number

  @Column({ name: 'customer_id' })
  customer_id: string; // Reference to Customer Service

  @Column({ name: 'scheme_code', type: 'int' })
  scheme_code: number; // SCHEMAST.s_appl

  @Column({
    name: 'account_nature',
    type: 'enum',
    enum: AccountNature,
  })
  account_nature: AccountNature; // SB / CA / TD / LN 


  @Column({ name: 'branch_code' })
  branch_code: string;


  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  status: AccountStatus;

  @Column({ default: false })
  is_deleted: boolean;



  @CreateDateColumn({ name: 'opened_at' })
  opened_at: Date;

  @Column({ name: 'opened_by', nullable: true })
  opened_by: string; // USER / ADMIN / SYSTEM


  @Column({ name: 'closed_at', nullable: true })
  closed_at: Date;


  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
