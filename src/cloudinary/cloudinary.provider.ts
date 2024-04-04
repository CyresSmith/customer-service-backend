import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
    provide: 'CLOUDINARY',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const cloud_name = configService.get<string>('CLOUD_NAME');
        const api_key = configService.get<string>('CLOUD_API_KEY');
        const api_secret = configService.get<string>('CLOUD_API_SECRET');

        return cloudinary.config({
            cloud_name,
            api_key,
            api_secret,
        });
    },
};
