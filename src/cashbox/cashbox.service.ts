import {
    BadRequestException,
    Injectable,
    NotFoundException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { Cashbox } from 'db/entities';
import { CashboxRepository, EmployeesRepository } from 'src/common/repositories';
import { MessageResponse } from 'src/common/types';
import { DeepPartial } from 'typeorm';
import { CashboxBasicInfo } from './cashbox.types';
import { CreateCashboxDto } from './dto/create-cashbox.dto';
import { UpdateCashboxDto } from './dto/update-cashbox.dto';

@Injectable()
export class CashboxService {
    constructor(
        private readonly cashboxRepository: CashboxRepository,
        private readonly employeesRepository: EmployeesRepository
    ) {}

    // ================================= Create Cashbox

    async create(dto: CreateCashboxDto, companyId: number): Promise<CashboxBasicInfo> {
        const isEmployeeExist = await this.employeesRepository.findOneBy({
            id: dto.responsible,
            company: { id: companyId },
        });

        if (!isEmployeeExist) {
            throw new BadRequestException('Відповідальний співробітник не знайдено');
        }

        const newCashbox = this.cashboxRepository.create({
            ...dto,
            responsible: { id: dto.responsible },
            company: { id: companyId },
        });

        const cashbox = await this.cashboxRepository.save(newCashbox);

        const { id, name, balance, isActive, updatedAt, createdAt } = cashbox;

        const { id: responsibleId, firstName, lastName } = isEmployeeExist;

        return {
            id,
            name,
            balance,
            isActive,
            updatedAt,
            createdAt,
            responsible: { id: responsibleId, firstName, lastName },
        };
    }

    // ================================= Find All Cashbox

    async findAll(id: number): Promise<CashboxBasicInfo[]> {
        return await this.cashboxRepository.find({
            where: { company: { id } },
            select: {
                id: true,
                name: true,
                balance: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
                responsible: { id: true, firstName: true, lastName: true },
            },
            relations: ['responsible'],
        });
    }

    // ================================= Find one Cashbox

    async findOne(companyId: number, id: number) {
        return await this.cashboxRepository.findOne({
            where: { id, company: { id: companyId } },
            select: {
                id: true,
                name: true,
                balance: true,
                isActive: true,
                comment: true,
                createdAt: true,
                updatedAt: true,
                responsible: { id: true, firstName: true, lastName: true },
            },
            relations: ['responsible'],
        });
    }

    // ================================= Update Cashbox

    async update(companyId: number, id: number, dto: UpdateCashboxDto): Promise<MessageResponse> {
        const isExist = await this.cashboxRepository.findOneBy({ id, company: { id: companyId } });

        if (!isExist) throw new NotFoundException('Касу не знайдено');

        const data = Object.keys(dto).includes('responsible')
            ? { ...dto, responsible: { id: dto.responsible } }
            : dto;

        const update = await this.cashboxRepository.update(
            { id, company: { id: companyId } },
            data as DeepPartial<Cashbox>
        );

        if (!update) {
            throw new ServiceUnavailableException('Щось пішло не так :(');
        }

        return { message: `Каса "${isExist.name}" оновлено` };
    }

    // ================================= Change Cashbox Balance

    async changeBalance(companyId: number, id: number, balance: number): Promise<MessageResponse> {
        const isExist = await this.cashboxRepository.findOneBy({ id, company: { id: companyId } });

        if (!isExist) throw new NotFoundException('Касу не знайдено');

        const update = await this.cashboxRepository.update(
            { id, company: { id: companyId } },
            { balance }
        );

        if (!update) {
            throw new ServiceUnavailableException('Щось пішло не так :(');
        }

        return { message: `Баланс "${isExist.name}" оновлено` };
    }

    // ================================= Update Cashbox Balance

    async updateBalance(companyId: number, id: number, amount: number): Promise<MessageResponse> {
        const isExist = await this.cashboxRepository.findOneBy({ id, company: { id: companyId } });

        if (!isExist) throw new NotFoundException('Касу не знайдено');

        const update = await this.cashboxRepository.update(
            { id, company: { id: companyId } },
            { balance: (isExist.balance += amount) }
        );

        if (!update) {
            throw new ServiceUnavailableException('Щось пішло не так :(');
        }

        return { message: `Баланс "${isExist.name}" оновлено` };
    }

    // ================================= Remove Cashbox

    async remove(companyId: number, id: number): Promise<MessageResponse> {
        const isExist = await this.cashboxRepository.findOne({
            where: { id, company: { id: companyId } },
        });

        if (!isExist) {
            throw new BadRequestException('Каса не знайдена');
        }

        await this.cashboxRepository.delete({ id, company: { id: companyId } });

        return { message: `Каса  "${isExist.name}" видалена` };
    }
}
