import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, AccountStatus } from 'src/entities/ACCOUNTS.entity';
import { AccountNumberSequence } from 'src/entities/ACCOUNTNUMBERSEQUENCE.entity';
import { DPMaster } from 'src/entities/DPMASTER.entity';
import { LockerMaster } from 'src/entities/LKMASTER.entity';
import { LNMaster } from 'src/entities/LNMASTER.entity';
import { PGMaster } from 'src/entities/PGMASTER.entity';
import { SchemeMaster } from 'src/entities/SCHEMAST.entity';

@Module({
  imports : [ TypeOrmModule.forFeature([Account, AccountNumberSequence, DPMaster, LockerMaster, LNMaster , PGMaster , SchemeMaster])],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
 