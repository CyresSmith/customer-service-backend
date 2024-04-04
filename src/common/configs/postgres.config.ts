import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Entities from '../../../db/entities';

export default {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) =>
        ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            database: configService.get('DB_NAME'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            entities: Entities,
            synchronize: false,
            logging: ['error'],
        }) as TypeOrmModuleOptions,
};
