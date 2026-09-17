import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Payments backend')
    .setDescription('Payments backend API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/swagger', app, swaggerDocument, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    jsonDocumentUrl: 'swagger/json',
  });

  const terminateApplication = () => {
    app
      .close()
      .then(() => process.exit(1))
      .catch(() => process.exit(1));
  };

  process.once('unhandledRejection', (err) => {
    logger.error(err?.['message'] as string, err?.['stack'] as string);
    terminateApplication();
  });

  process.once('SIGINT', terminateApplication);
  process.once('SIGTERM', terminateApplication);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().then().catch(console.error);
