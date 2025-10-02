import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Opcional: todas las rutas empiezan con /api
  
  app.enableCors({
    origin: '*', // Permitir todas las fuentes
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  });
  await app.listen(3000);
  console.log('Backend corriendo en http://localhost:3000');
}
bootstrap();

