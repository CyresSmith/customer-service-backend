import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository, CompaniesRepository } from 'src/common/repositories';
import { ServicesCategoriesRepository } from 'src/common/repositories/servicesCategories.repository';
import { CategoryType, ServiceType } from 'src/common/types';
import {
    IBasicCategoryInfo,
    IBasicServiceCategoryInfo,
    ICompanyCategoryInfo,
} from './categories.types';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly categoriesRepository: CategoriesRepository,
        private readonly servicesCategoriesRepository: ServicesCategoriesRepository,
        private readonly companyRepository: CompaniesRepository
    ) {}

    // ============================================ Create company category

    async create(createCategoryDto: CreateCategoryDto): Promise<IBasicCategoryInfo> {
        const { name } = createCategoryDto;

        const isExist = await this.categoriesRepository.checkIsExist(name);

        if (isExist) {
            throw new BadRequestException(`Category with name "${name}" is already exist`);
        }

        const newCategory = this.categoriesRepository.create({
            ...createCategoryDto,
        });

        const category = await this.categoriesRepository.save(newCategory);

        return { id: category.id, name: category.name, type: category.type };
    }

    // ============================================ Create company category

    async createForCompany(
        createCategoryDto: CreateCategoryDto,
        companyId: number
    ): Promise<IBasicCategoryInfo> {
        const { name } = createCategoryDto;

        const isExist = await this.categoriesRepository.checkIsExist(name);

        if (isExist) {
            throw new BadRequestException(`Category with name "${name}" is already exist`);
        }

        const newCategory = this.categoriesRepository.create({
            ...createCategoryDto,
            companies: [{ id: companyId }],
        });

        const category = await this.categoriesRepository.save(newCategory);

        return { id: category.id, name: category.name, type: category.type };
    }

    // ============================================ Get all categories by company id

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

    // ============================================ Get categories by type

    async findByType(type: CategoryType): Promise<IBasicCategoryInfo[]> {
        return await this.categoriesRepository.find({
            where: {
                type,
            },
            select: ['id', 'name', 'type'],
            order: { id: 'ASC' },
        });
    }

    // ============================================ Get Company Activity categories

    async findCompanyCategories(): Promise<ICompanyCategoryInfo[]> {
        return await this.categoriesRepository.find({
            where: {
                type: 'activity',
            },
            relations: ['activities'],
            select: {
                id: true,
                name: true,
                activities: {
                    id: true,
                    name: true,
                },
            },
            order: { id: 'ASC' },
        });
    }

    // ============================================ Add Company service category

    async addCompanyServiceCategory(data: {
        company: { id: number };
        name: string;
        type: ServiceType;
    }): Promise<IBasicServiceCategoryInfo> {
        await this.servicesCategoriesRepository.checkIsExist(data.name);

        const newServiceCategory = this.servicesCategoriesRepository.create(data);

        const { id, name, type } = await this.servicesCategoriesRepository.save(newServiceCategory);

        return { id, name, type };
    }

    // ============================================ Get Company services categories

    async getServicesCategories(id: number): Promise<IBasicServiceCategoryInfo[]> {
        return await this.servicesCategoriesRepository.find({
            where: {
                company: { id },
            },
            select: {
                id: true,
                name: true,
                type: true,
            },
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
