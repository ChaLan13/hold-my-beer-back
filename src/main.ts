import { NestFactory } from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import * as Config from 'config';
import { AppConfig } from './app-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CrudBeerModule } from './CRUD/crud-beer.module';
import { SwaggerConfig} from './interfaces/swagger-config.interface';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
    // create NestJS application
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: true }),
    );

    app.enableCors();
    // use global pipe validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    // create swagger options
    const options = new DocumentBuilder()
        .setTitle(swaggerConfig.title)
        .setDescription(swaggerConfig.description)
        .setVersion(swaggerConfig.version)
        .addTag(swaggerConfig.tag)
        .build();

    // create swagger document
    const peopleDocument = SwaggerModule.createDocument(app, options, {
        include: [ CrudBeerModule ],
    });

    // setup swagger module
    SwaggerModule.setup(swaggerConfig.path, app, peopleDocument);
    await app.listen(config.port, config.host);
    Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');
}

bootstrap(Config.get<AppConfig>('server'), Config.get<SwaggerConfig>('swagger'));
