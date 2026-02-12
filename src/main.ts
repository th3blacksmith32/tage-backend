import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  //  Root health route (REQUIRED for Railway)
  const server = app.getHttpAdapter().getInstance();
  server.get('/', (req, res) => {
    res.status(200).send('TAGE API OK');
  });

  server.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
}

bootstrap();