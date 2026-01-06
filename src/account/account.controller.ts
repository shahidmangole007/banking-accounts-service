import { Controller, Get, Param, Version } from '@nestjs/common';
import { AccountService } from './account.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('account')
export class AccountController {

    constructor(private readonly accountService : AccountService){}

    @ApiOperation({ summary: 'Get All Active Accounts Schemes' })
    @ApiResponse({ status: 200, description: 'Active Account fetched Successfull.' })
    @ApiResponse({ status: 400, description: 'Active Account failed to fetch.' })
    @ApiResponse({ status: 404, description: 'API not found' })
    // @Throttle({ default: { limit: 3, ttl: 60 } })
    @Version('1')
    @Get('/')
    async getAllActiveSchemes(){
        return this.accountService.getAllActiveSchemes()
    }

    @ApiOperation({ summary: 'Get Scheme by Scheme Code ' })
    @ApiResponse({ status: 200, description: 'Scheme fetched Successfully.' })
    @ApiResponse({ status: 400, description: 'Scheme failed to fetch.' })
    // @Throttle({ default: { limit: 3, ttl: 60 } })
    @Version('1')
    @Get('/:schemeCode')
    async getSchemeByCode(@Param('schemeCode') schemeCode : string){
        return this.accountService.getSchemeByCode(+schemeCode)
    }

    //Admin Only
    // @ApiOperation({ summary: 'Get Scheme by Scheme Code ' })
    // @ApiResponse({ status: 200, description: 'Scheme fetched Successfully.' })
    // @ApiResponse({ status: 400, description: 'Scheme failed to fetch.' })
    // // @Throttle({ default: { limit: 3, ttl: 60 } })
    // @Version('1')
    // @Get('/:schemeCode/:status')
    // async enableOrDisableSchemeByCode(@Param('schemeCode') schemeCode : string , @Param('status') status : 'enable' | 'disable'){
    //     return this.accountService.enableOrDisableSchemeByCode(+schemeCode , status)
    // }


}
