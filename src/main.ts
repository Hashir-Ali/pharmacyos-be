import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());

  // swagger documentation................................................................
  const options = new DocumentBuilder()
    .setTitle('PharmacyOS BE')
    .setDescription('RESTFUL API Documentation and playground for PharmacyOS')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(process.env.LOCAL_SERVER_URL+':'+process.env.PORT, 'Local environment')
    .addServer(process.env.PRODUCTION_SERVER_URL+':'+process.env.PORT, 'Production environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(process.env.PORT);
}
bootstrap();
