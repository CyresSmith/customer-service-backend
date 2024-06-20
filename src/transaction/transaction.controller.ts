import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Company } from 'db/entities';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { ChangeBalanceDto } from './dto/change-balance.dto';
import { MovingTransactionDto } from './dto/moving-transaction.dto';
import { PurchaseTransactionDto } from './dto/purchase-transaction.dto';
import { SalaryTransactionDto } from './dto/salary-transaction.dto';
import { SellTransactionDto } from './dto/sell-transaction.dto';
import { ServiceTransactionDto } from './dto/service-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    // ================================= Get Transactions

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get()
    async findAll(
        @Query('companyId') companyId: number,
        @Query('year') year: number,
        @Query('month') month: number,
        @Query('day') day: number,
        @Query('time') time: number
    ) {
        return await this.transactionService.findAll({
            company: { id: companyId } as Company,
            year,
            month,
            day,
            time,
        });
    }

    // ================================= Get Transactions Period

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('/period')
    async findPeriod(
        @Query('companyId') companyId: number,
        @Query('from') from: string,
        @Query('to') to: string
    ) {
        return await this.transactionService.findPeriod(companyId, { from, to });
    }

    // ================================= Get Transaction By Id

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionService.findOne(+id);
    }

    // ================================= Add Service Transaction

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('service')
    async createServiceTransaction(
        @Param('id') id: number,
        @Query('companyId') companyId: number,
        @Body() dto: ServiceTransactionDto
    ) {
        return await this.transactionService.createServiceTransaction(companyId, dto);
    }

    // ================================= Add Sell Transaction

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('sell')
    async createSellTransaction(
        @Param('id') id: number,
        @Query('companyId') companyId: number,
        @Body() dto: SellTransactionDto
    ) {
        return await this.transactionService.createSellTransaction(companyId, dto);
    }

    // ================================= Add Moving Transaction

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('moving')
    async createMovingTransaction(
        @Param('id') id: number,
        @Query('companyId') companyId: number,
        @Body() dto: MovingTransactionDto
    ) {
        return await this.transactionService.createMovingTransaction(companyId, dto);
    }

    // ================================= Add Purchase Transaction

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('purchase')
    async createPurchaseTransaction(
        @Param('id') id: number,
        @Query('companyId') companyId: number,
        @Body() dto: PurchaseTransactionDto
    ) {
        return await this.transactionService.createPurchaseTransaction(companyId, dto);
    }

    // ================================= Add Salary Transaction

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('salary')
    async createSalaryTransaction(
        @Param('id') id: number,
        @Query('companyId') companyId: number,
        @Body() dto: SalaryTransactionDto
    ) {
        return await this.transactionService.createSalaryTransaction(companyId, dto);
    }

    // ================================= Add Change Balance Transaction

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('change-balance')
    async createChangeBalanceTransaction(
        @Param('id') id: number,
        @Query('companyId') companyId: number,
        @Body() dto: ChangeBalanceDto
    ) {
        return await this.transactionService.createChangeBalanceTransaction(companyId, dto);
    }

    // ================================= Update Transaction By Id

    @Roles(RolesEnum.OWNER)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
        return this.transactionService.update(+id, updateTransactionDto);
    }

    // ================================= Delete Transaction By Id

    @Roles(RolesEnum.OWNER)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionService.remove(+id);
    }
}
