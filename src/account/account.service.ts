import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchemeMaster } from 'src/entities/SCHEMAST.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {

    constructor(
        @InjectRepository(SchemeMaster) private SchemeMasterRepo: Repository<SchemeMaster>
    ) { }


    async getAllActiveSchemes() {
        try {

            console.log("inside ser");

            const schemes = await this.SchemeMasterRepo.find({
                where: {
                    is_active: true
                }
            })
            return schemes
        } catch (error) {
            throw new InternalServerErrorException('Error while fetching Active Accounts')
        }
    }

    async getSchemeByCode(schemeCode: number) {
        try {
            const scheme = await this.SchemeMasterRepo.findOne({
                where: { s_appl: schemeCode }
            })

            return scheme
        } catch (error) {
            throw new InternalServerErrorException('Error while fetching Scheme')
        }
    }

    async enableOrDisableSchemeByCode(
        schemeCode: number,
        status: 'enable' | 'disable'
    ) {
        if (status !== 'enable' && status !== 'disable') {
            throw new BadRequestException(
                "Select valid status: 'enable' or 'disable'"
            );
        }

        const updatedStatus = status === 'enable';

        const result = await this.SchemeMasterRepo.update(
            {
                s_appl: schemeCode,
                is_active: !updatedStatus, 
            },
            {
                is_active: updatedStatus,
            }
        );


        if (result.affected === 1) {
            return {
                message: `Scheme with schemecode ${schemeCode} ${status}d successfully`,
            };
        }

        const schemeExists = await this.SchemeMasterRepo.exist({
            where: { s_appl: schemeCode },
        });

        if (!schemeExists) {
            throw new NotFoundException(`Scheme with code ${schemeCode} not found`);
        }

        throw new BadRequestException(`Scheme already ${status}d`);
    }


}
