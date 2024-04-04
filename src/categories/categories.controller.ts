import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { CategoryType } from 'src/common/types';
import { CategoriesService } from './categories.service';
import {
    IBasicCategoryInfo,
    IBasicServiceCategoryInfo,
    ICompanyCategoryInfo,
} from './categories.types';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    // ============================================ Add category

    @Post('')
    @HttpCode(201)
    create(@Body() createCategoryDto: CreateCategoryDto): Promise<IBasicCategoryInfo> {
        return this.categoriesService.create(createCategoryDto);
    }

    // ============================================ Add company category

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('company/:companyId')
    @HttpCode(201)
    createForCompany(
        @Body() createCategoryDto: CreateCategoryDto,
        @Param('companyId') companyId: number
    ): Promise<IBasicCategoryInfo> {
        return this.categoriesService.createForCompany(createCategoryDto, companyId);
    }

    // ============================================ Get all categories

    @UseGuards(AccessTokenGuard)
    @Get()
    @HttpCode(200)
    async findAll(): Promise<IBasicCategoryInfo[]> {
        return await this.categoriesService.findAll();
    }

    // ============================================ Get all categories by company id

    @UseGuards(AccessTokenGuard)
    @Get('company/:companyId')
    @HttpCode(200)
    async findAllByCompanyId(@Param('companyId') companyId: number): Promise<IBasicCategoryInfo[]> {
        return await this.categoriesService.findAllByCompanyId(companyId);
    }

    // ============================================ Get categories by type

    @UseGuards(AccessTokenGuard)
    @Get('type/:type')
    @HttpCode(200)
    async findByType(@Param('type') type: CategoryType): Promise<IBasicCategoryInfo[]> {
        return await this.categoriesService.findByType(type);
    }

    // ============================================  Get Company Activity categories

    @UseGuards(AccessTokenGuard)
    @Get('company')
    @HttpCode(200)
    async findCompanyCategories(): Promise<ICompanyCategoryInfo[]> {
        return await this.categoriesService.findCompanyCategories();
    }

    // ============================================ Get services categories

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('services')
    @HttpCode(200)
    async getServicesCategories(
        @Query('companyId') companyId: number
    ): Promise<IBasicServiceCategoryInfo[]> {
        return await this.categoriesService.getServicesCategories(companyId);
    }

    // ============================================ Add services category

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('services')
    @HttpCode(200)
    async addServiceCategory(
        @Query('companyId') id: number,
        @Body() categoryData: CreateServiceCategoryDto
    ): Promise<IBasicServiceCategoryInfo> {
        return await this.categoriesService.addCompanyServiceCategory({
            company: { id },
            ...categoryData,
        });
    }

    // ============================================

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoriesService.update(+id, updateCategoryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(+id);
    }
}
