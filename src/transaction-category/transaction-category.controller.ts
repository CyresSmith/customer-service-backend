import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';
import { TransactionCategoryService } from './transaction-category.service';

@Controller('transaction-category')
export class TransactionCategoryController {
    constructor(private readonly transactionCategoryService: TransactionCategoryService) {}

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post()
    create(@Body() createTransactionCategoryDto: CreateTransactionCategoryDto) {
        return this.transactionCategoryService.create(createTransactionCategoryDto);
    }

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get()
    findAll() {
        return this.transactionCategoryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.transactionCategoryService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateTransactionCategoryDto: UpdateTransactionCategoryDto
    ) {
        return this.transactionCategoryService.update(+id, updateTransactionCategoryDto);
    }

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.transactionCategoryService.remove(+id);
    }
}
