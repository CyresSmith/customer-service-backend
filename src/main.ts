import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.enableShutdownHooks();
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        })
    );

    await app.listen(process.env.PORT ?? 3101, '0.0.0.0', () => {
        console.log('Sever started on port ' + process.env.PORT ?? 3101);
    });
}
bootstrap();
