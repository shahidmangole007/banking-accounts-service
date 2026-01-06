import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum LockerSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

@Entity('locker_master')
export class LockerMaster {


  @PrimaryColumn({ name: 'account_number' })
  accountNumber: string; // FK → accounts.account_number


  @Column({ name: 'locker_number' })
  lockerNumber: string;

  @Column({
    type: 'enum',
    enum: LockerSize,
  })
  locker_size: LockerSize;


  @Column({ type: 'decimal', precision: 10, scale: 2 })
  annual_rent: number;

  @Column({ type: 'date' })
  allotment_date: Date;

  @Column({ type: 'date', nullable: true })
  surrender_date: Date;


  @Column({ default: false })
  is_joint: boolean;


  @Column({ default: true })
  is_active: boolean;


  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
