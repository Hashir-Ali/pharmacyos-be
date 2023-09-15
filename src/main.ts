import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('PharmacyOS BE')
    .setDescription('RESTFUL API Documentation and playground for PharmacyOS')
    .setVersion('1.0')
    .addServer(process.env.LOCAL_SERVER_URL+':'+process.env.PORT, 'Local environment')
    .addServer(process.env.PRODUCTION_SERVER_URL+':'+process.env.PORT, 'Production environment')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(process.env.PORT);
}
bootstrap();
