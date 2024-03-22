import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Activity,
  Company,
  Employee,
  Resource,
  Service,
  ServiceCategory,
} from 'db/entities';
import { CategoriesService } from 'src/categories/categories.service';
import { IBasicServiceCategoryInfo } from 'src/categories/categories.types';
import { CreateServiceCategoryDto } from 'src/categories/dto/create-service-category.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import {
  IBasicServiceInfo,
  MessageResponse,
  ServiceDataType,
} from 'src/common/types';
import { CreateServiceDto } from 'src/services/dto/create-service.dto';
import { UpdateServiceDto } from 'src/services/dto/update-service.dto';
import { ServicesService } from 'src/services/services.service';
import { IBasicUserInfo } from 'src/users/users.types';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyProfileDto } from './dto/update-company-profile.dto';

@Controller('company')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly servicesService: ServicesService,
    private readonly categoriesService: CategoriesService
  ) {}

  // ============================================ Register company

  @UseGuards(AccessTokenGuard)
  @Post('register')
  @HttpCode(201)
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Request() { user }: { user: IBasicUserInfo }
  ): Promise<Partial<Company>> {
    return await this.companiesService.create(createCompanyDto, user.id);
  }

  // ============================================ Get Company by id

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId')
  @HttpCode(200)
  findOne(@Param('companyId') companyId: number) {
    return this.companiesService.findOne(companyId);
  }

  // ============================================ Get company profile

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/profile')
  @HttpCode(200)
  async getProfile(@Param('companyId') companyId: number): Promise<Company> {
    return await this.companiesService.getProfile(companyId);
  }

  // ============================================ Get company Activities

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/activities')
  @HttpCode(200)
  async getActivities(
    @Param('companyId') companyId: number
  ): Promise<Activity[]> {
    return await this.companiesService.getActivities(companyId);
  }

  // ============================================ Update company avatar

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post(':companyId/profile/avatar')
  @HttpCode(200)
  async updateAvatar(
    @Param('companyId') companyId: number,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<{ url: string }> {
    const { url } = await this.cloudinaryService.uploadFile(
      {
        folder: `company_${companyId}_avatars`,
        allowed_formats: ['jpg', 'jpeg', 'png'],
        max_bytes: 5 * 1024 * 1024,
      },
      avatar
    );

    await this.companiesService.updateAvatar(companyId, {
      avatar: url,
    });

    return { url };
  }

  // ============================================ Update company profile

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':companyId/profile')
  @HttpCode(200)
  async updateProfile(
    @Param('companyId') companyId: number,
    @Body() data: UpdateCompanyProfileDto
  ): Promise<MessageResponse> {
    await this.companiesService.updateProfile(companyId, data);

    return { message: 'Successfully updated' };
  }

  // ============================================ Add service

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post(':companyId/service')
  @HttpCode(200)
  async addService(
    @Param('companyId') companyId: number,
    @Body() createServiceDto: CreateServiceDto
  ): Promise<IBasicServiceInfo> {
    return await this.servicesService.create(createServiceDto, companyId);
  }

  // ============================================ Get company services

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/services')
  @HttpCode(200)
  async getServices(
    @Param('companyId') companyId: number
  ): Promise<IBasicServiceInfo[]> {
    return await this.servicesService.getServices(companyId);
  }

  // ============================================ Get company service by id

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/service/:serviceId')
  @HttpCode(200)
  async getServiceById(
    @Param('companyId') companyId: number,
    @Param('serviceId') serviceId: number
  ): Promise<ServiceDataType> {
    return await this.servicesService.getServiceById(companyId, serviceId);
  }

  // ============================================ Get services categories

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Get(':companyId/services-categories')
  @HttpCode(200)
  async getServicesCategories(
    @Param('companyId') companyId: number
  ): Promise<IBasicServiceCategoryInfo[]> {
    return await this.categoriesService.getServicesCategories(companyId);
  }

  // ============================================ Add services category

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Post(':companyId/services-categories')
  @HttpCode(200)
  async addServiceCategory(
    @Param('companyId') id: number,
    @Body() categoryData: CreateServiceCategoryDto
  ): Promise<IBasicServiceCategoryInfo> {
    return await this.categoriesService.addCompanyServiceCategory({
      company: { id },
      ...categoryData,
    });
  }

  // ============================================ Update service avatar

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch(':companyId/service/:serviceId/avatar')
  @HttpCode(200)
  async updateServiceAvatar(
    @Param('companyId') companyId: number,
    @Param('serviceId') serviceId: number,
    @UploadedFile() avatar: Express.Multer.File
  ): Promise<{ url: string }> {
    const { url } = await this.cloudinaryService.uploadFile(
      {
        folder: `company_${companyId}_avatars`,
        allowed_formats: ['jpg', 'jpeg', 'png'],
        max_bytes: 5 * 1024 * 1024,
      },
      avatar
    );

    await this.servicesService.updateService(companyId, serviceId, {
      avatar: url as string,
    });

    return { url };
  }

  // ============================================ Update service

  @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Patch(':companyId/service/:serviceId')
  @HttpCode(200)
  async updateService(
    @Param('companyId') companyId: number,
    @Param('serviceId') serviceId: number,
    @Body() data: UpdateServiceDto
  ): Promise<MessageResponse> {
    let updateData: Partial<Service> = {};

    if (data.category) {
      updateData = {
        ...updateData,
        category: { id: data.category } as ServiceCategory,
      };
    }

    if (data.employees && data.employees.length > 0) {
      updateData = {
        ...updateData,
        employees: data.employees.map(id => ({
          id,
        })) as Employee[],
      };
    }

    if (data.resources && data.resources.length > 0) {
      updateData = {
        ...updateData,
        resources: data.resources.map(id => ({
          id,
        })) as Resource[],
      };
    }

    await this.servicesService.updateService(companyId, serviceId, {
      ...data,
      ...updateData,
    } as Partial<Service>);

    return { message: 'Послугу оновлено' };
  }

  // ============================================

  // @Get()
  // findAll() {
  //   return this.companiesService.findAll();
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
  //   return this.companiesService.update(+id, updateCompanyDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.companiesService.remove(+id);
  // }
}
