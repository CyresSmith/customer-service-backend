import { BadRequestException, Injectable } from '@nestjs/common';
import {
  CategoriesRepository,
  CompaniesRepository,
} from 'src/common/repositories';
import { IBasicCategoryInfo } from './categories.types';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly companyRepository: CompaniesRepository
  ) {}

  // ============================================ Create category

  async create(
    createCategoryDto: CreateCategoryDto,
    companyId: number
  ): Promise<IBasicCategoryInfo> {
    const { name } = createCategoryDto;

    const isExist = await this.categoriesRepository.checkIsExist(name);

    if (isExist) {
      throw new BadRequestException(
        `Category with name "${name}" is already exist`
      );
    }

    const newCategory = this.categoriesRepository.create({
      ...createCategoryDto,
      companies: [{ id: companyId }],
    });

    const category = await this.categoriesRepository.save(newCategory);

    return { id: category.id, name: category.name, type: category.type };
  }

  // ============================================ Get all categories

  async findAllByCompanyId(companyId: number): Promise<IBasicCategoryInfo[]> {
    return await this.categoriesRepository.find({
      where: {
        companies: {
          id: companyId,
        },
      },
      select: ['id', 'name', 'type'],
    });
  }

  // ============================================ Get all categories

  async findAll(): Promise<IBasicCategoryInfo[]> {
    return await this.categoriesRepository.find({
      select: ['id', 'name', 'type'],
    });
  }

  // ============================================

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
