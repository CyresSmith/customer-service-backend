import { Module } from '@nestjs/common';
import { TransactionCategoryRepository } from 'src/common/repositories';
import { TransactionCategoryController } from './transaction-category.controller';
import { TransactionCategoryService } from './transaction-category.service';

@Module({
    controllers: [TransactionCategoryController],
    providers: [TransactionCategoryService, TransactionCategoryRepository],
})
export class TransactionCategoryModule {}
