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
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { CashboxService } from './cashbox.service';
import { CreateCashboxDto } from './dto/create-cashbox.dto';
import { UpdateCashboxDto } from './dto/update-cashbox.dto';

@Controller('cashbox')
export class CashboxController {
    constructor(private readonly cashboxService: CashboxService) {}

    @Roles(RolesEnum.OWNER)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post()
    async create(
        @Query('companyId') companyId: number,
        @Body() createCashboxDto: CreateCashboxDto
    ) {
        return await this.cashboxService.create(createCashboxDto, companyId);
    }

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get()
    async findAll(@Query('companyId') companyId: number) {
        return await this.cashboxService.findAll(companyId);
    }

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get(':id')
    findOne(@Query('companyId') companyId: number, @Param('id') id: number) {
        return this.cashboxService.findOne(companyId, id);
    }

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Patch(':id')
    update(
        @Query('companyId') companyId: number,
        @Param('id') id: number,
        @Body() updateCashboxDto: UpdateCashboxDto
    ) {
        return this.cashboxService.update(companyId, id, updateCashboxDto);
    }

    @Roles(RolesEnum.OWNER)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Delete(':id')
    remove(@Query('companyId') companyId: number, @Param('id') id: number) {
        return this.cashboxService.remove(companyId, id);
    }
}
