import { Module } from '@nestjs/common';
import { TransactionCategoryService } from './transaction-category.service';
import { TransactionCategoryController } from './transaction-category.controller';

@Module({
  controllers: [TransactionCategoryController],
  providers: [TransactionCategoryService],
})
export class TransactionCategoryModule {}
