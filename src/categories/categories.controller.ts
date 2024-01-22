import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { CategoriesService } from './categories.service';
import { IBasicCategoryInfo } from './categories.types';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // ============================================ Add category

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post('company/:companyId')
  @HttpCode(201)
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Param('companyId') companyId: number
  ): Promise<IBasicCategoryInfo> {
    return this.categoriesService.create(createCategoryDto, companyId);
  }

  // ============================================ Get all categories

  @UseGuards(AccessTokenGuard)
  @Get()
  @HttpCode(200)
  async findAll(): Promise<IBasicCategoryInfo[]> {
    return await this.categoriesService.findAll();
  }

  // ============================================ Get all categories

  @UseGuards(AccessTokenGuard)
  @Get('company/:companyId')
  @HttpCode(200)
  async findAllByCompanyId(
    @Param('companyId') companyId: number
  ): Promise<IBasicCategoryInfo[]> {
    return await this.categoriesService.findAllByCompanyId(companyId);
  }

  // ============================================

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
