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
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Employee, Resource, Service, ServiceCategory } from 'db/entities';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { IBasicServiceInfo, MessageResponse, ServiceDataType } from 'src/common/types';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('service')
export class ServicesController {
    constructor(
        private readonly servicesService: ServicesService,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    // ============================================ Create new service

    @Roles(RolesEnum.OWNER)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('')
    @HttpCode(200)
    async create(
        @Body() createServiceDto: CreateServiceDto,
        @Query('companyId') companyId: number
    ): Promise<IBasicServiceInfo> {
        return await this.servicesService.create(createServiceDto, companyId);
    }

    // ============================================ Get company services

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('get-all')
    @HttpCode(200)
    async getServices(@Query('companyId') companyId: number): Promise<IBasicServiceInfo[]> {
        return await this.servicesService.getServices(companyId);
    }

    // ============================================ Get Employee services

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get('employee')
    @HttpCode(200)
    async getEmployeeServices(
        @Query('companyId') companyId: number,
        @Query('employeeId') employeeId: number
    ): Promise<IBasicServiceInfo[]> {
        return await this.servicesService.getServices(companyId, employeeId);
    }

    // ============================================ Update service avatar

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @UseInterceptors(FileInterceptor('avatar'))
    @Patch(':serviceId/avatar')
    @HttpCode(200)
    async updateServiceAvatar(
        @Param('serviceId') serviceId: number,
        @Query('companyId') companyId: number,
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

    // ============================================ Get company service by id

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN, RolesEnum.EMPLOYEE)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Get(':serviceId')
    @HttpCode(200)
    async getServiceById(
        @Query('companyId') companyId: number,
        @Param('serviceId') serviceId: number
    ): Promise<ServiceDataType> {
        return await this.servicesService.getServiceById(companyId, serviceId);
    }

    // ============================================ Update service

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Patch(':serviceId')
    @HttpCode(200)
    async updateService(
        @Query('companyId') companyId: number,
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
                    id: +id,
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

    // ============================================ Delete service

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Delete(':serviceId')
    @HttpCode(200)
    async deleteService(
        @Query('companyId') companyId: number,
        @Param('serviceId') serviceId: number
    ): Promise<MessageResponse> {
        await this.servicesService.remove(companyId, serviceId);

        return { message: 'Послугу видалено' };
    }

    // ============================================

    // @Get()
    // findAll() {
    //     return this.servicesService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.servicesService.findOne(+id);
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    //     return this.servicesService.update(+id, updateServiceDto);
    // }
}
