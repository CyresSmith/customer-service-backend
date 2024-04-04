import { Injectable } from '@nestjs/common';
import { Activity } from 'db/entities';
import { ActivityRepository } from 'src/common/repositories';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {
    constructor(private readonly activityRepository: ActivityRepository) {}

    // ============================================ Add activity

    async create({ name, categoryId }: CreateActivityDto): Promise<Activity> {
        await this.activityRepository.checkIsExist(name);

        const newActivity = this.activityRepository.create({
            name,
            category: { id: categoryId },
        });

        return await this.activityRepository.save(newActivity);
    }

    // ============================================ Find all by category id

    async findAllByCategoryId(categoryId: number): Promise<Activity[]> {
        return await this.activityRepository.find({
            where: { category: { id: categoryId } },
            select: ['id', 'name'],
        });
    }

    // ============================================

    findAll() {
        return `This action returns all activities`;
    }

    findOne(id: number) {
        return `This action returns a #${id} activity`;
    }

    update(id: number, updateActivityDto: UpdateActivityDto) {
        return `This action updates a #${id} activity`;
    }

    remove(id: number) {
        return `This action removes a #${id} activity`;
    }
}
