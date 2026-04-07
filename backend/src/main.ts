import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS abierto para que cualquier frontend pueda conectarse
  app.enableCors({ origin: '*' });

  // Validación global: rechaza campos no declarados en el DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger UI disponible en http://localhost:3000/api
  const config = new DocumentBuilder()
    .setTitle('API de Contactos')
    .setDescription('Backend compartido por múltiples frontends — demo educativa')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Backend corriendo en   http://localhost:3000');
  console.log('Swagger UI disponible en http://localhost:3000/api');
}
bootstrap();
