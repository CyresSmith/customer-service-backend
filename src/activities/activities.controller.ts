import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Activity } from 'db/entities';
import { Roles } from 'src/common/decorators';
import { RolesEnum } from 'src/common/enums';
import { AccessTokenGuard, RolesGuard } from 'src/common/guards';
import { ActivitiesService } from './activities.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {}

    // ============================================ Add activity

    @Roles(RolesEnum.OWNER, RolesEnum.ADMIN)
    @UseGuards(AccessTokenGuard, RolesGuard)
    @Post('')
    create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
        return this.activitiesService.create(createActivityDto);
    }

    // ============================================ Find all by category id

    @UseGuards(AccessTokenGuard)
    @Get('category/:categoryId')
    findAllByCategoryId(@Param('categoryId') categoryId: number): Promise<Activity[]> {
        return this.activitiesService.findAllByCategoryId(categoryId);
    }

    // ============================================

    @Get()
    findAll() {
        return this.activitiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activitiesService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
        return this.activitiesService.update(+id, updateActivityDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activitiesService.remove(+id);
    }
}
