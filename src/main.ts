import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerCustomOptions, SwaggerModule} from '@nestjs/swagger';
import {ConfigService} from '@nestjs/config';
import {INestApplication} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    app.setGlobalPrefix('api/v1');

    const nodeEnv = configService.get<string>('NODE_ENV') || 'development';
    if (nodeEnv !== 'production') {
        initSwagger(app, configService);
    }

    const port = configService.get<number>('PORT') || 4000;
    await app.listen(port);
    console.log(`🚀 App running on http://localhost:${port}`);
}

function initSwagger(app: INestApplication<any>, configService: ConfigService<unknown, boolean>) {
    const config = new DocumentBuilder()
        .setTitle("Demo API")
        .setDescription('The Demo API description')
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);

    const options: SwaggerCustomOptions = {
        swaggerOptions: {
            persistAuthorization: true,
            deepLinking: true,
            docExpansion: "none",
            tagsSorter: "alpha",
            filter: true,
            ignoreGlobalPrefix: true
        }
    };

    const swaggerPath = configService.get<string>('SWAGGER_PATH') || 'api-docs';
    SwaggerModule.setup(swaggerPath, app, document, options);
}


bootstrap()
    .then(() => console.log('NestJS app started'))
    .catch(err => console.error('Failed to start NestJS app', err));

