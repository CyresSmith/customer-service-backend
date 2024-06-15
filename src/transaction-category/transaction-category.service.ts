import { Injectable } from '@nestjs/common';
import { TransactionCategoryRepository } from 'src/common/repositories';
import { CreateTransactionCategoryDto } from './dto/create-transaction-category.dto';
import { UpdateTransactionCategoryDto } from './dto/update-transaction-category.dto';

@Injectable()
export class TransactionCategoryService {
    constructor(private readonly transactionCategoryRepository: TransactionCategoryRepository) {}

    async create(dto: CreateTransactionCategoryDto) {
        const newCategory = this.transactionCategoryRepository.create({ ...dto });

        return await this.transactionCategoryRepository.save(newCategory);
    }

    async findAll() {
        return await this.transactionCategoryRepository.find();
    }

    findOne(id: number) {
        return `This action returns a #${id} transactionCategory`;
    }

    update(id: number, updateTransactionCategoryDto: UpdateTransactionCategoryDto) {
        return `This action updates a #${id} transactionCategory`;
    }

    remove(id: number) {
        return `This action removes a #${id} transactionCategory`;
    }
}
