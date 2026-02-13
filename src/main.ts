import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Root health route (REQUIRED for Railway)
  const server = app.getHttpAdapter().getInstance();
  server.get('/', (req, res) => {
    res.status(200).send('TAGE API OK');
  });

  server.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  // Serve SPA for non-API routes.
  server.get(/^(?!\/(auth|tasks|health)\b).*/, (req, res) => {
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
}

bootstrap();
