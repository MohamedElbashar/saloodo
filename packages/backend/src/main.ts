import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for',
  });
  const config = new DocumentBuilder()
    .setTitle('Saloodo Task')
    .setDescription(
      'Check out our full documentation to learn about everything you can do with the API.',
    )
    .setVersion('1.0')
    .setLicense('Saloodo', 'https://www.saloodo.com/')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );

  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
