import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔥 Bật CORS để cho phép frontend trên Render
  app.enableCors({
    origin: ['http://localhost:3000', 'https://cris-website.onrender.com'], // Cho phép cả local và Render
    credentials: true, // Cho phép gửi cookie (nếu có)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await app.listen(4000);
}
bootstrap();
