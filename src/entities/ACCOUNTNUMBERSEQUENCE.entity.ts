import { Entity, Column, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('account_number_sequence')
export class AccountNumberSequence {


  @PrimaryColumn({ name: 'branch_code' })
  branch_code: string;

  @PrimaryColumn({ name: 'scheme_code', type: 'int' })
  scheme_code: number;


  @Column({ type: 'bigint' })
  last_sequence: number;


  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}


