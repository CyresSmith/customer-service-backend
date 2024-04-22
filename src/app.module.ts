import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionsModule } from './actions/actions.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ClientsModule } from './clients/clients.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import envConfig from './common/configs/env.config';
import dbConfig from './common/configs/postgres.config';
import { RequestLoggingMiddleware } from './common/middleware/logging.middleware';
import { CompaniesModule } from './companies/companies.module';
import { EmailModule } from './email/email.module';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ResourcesModule } from './resources/resources.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ServicesModule } from './services/services.module';
import { SocketService } from './socket/socket.service';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync(dbConfig),
        ConfigModule.forRoot(envConfig),
        UsersModule,
        CompaniesModule,
        ClientsModule,
        AuthModule,
        EmailModule,
        EmployeesModule,
        CategoriesModule,
        ServicesModule,
        ProductsModule,
        ResourcesModule,
        ActivitiesModule,
        SchedulesModule,
        ActionsModule,
        CloudinaryModule,
    ],
    controllers: [],

    providers: [CloudinaryService, SocketService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggingMiddleware).forRoutes('*');
    }
}
