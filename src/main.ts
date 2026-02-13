import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Serve static frontend
  app.use(express.static(join(__dirname, '..', 'public')));

  // IMPORTANT: API routes work normally via Nest controllers

  // SPA fallback ONLY for non-API routes
  app.use((req, res, next) => {
    if (req.path.startsWith('/auth') || req.path.startsWith('/tasks')) {
      return next(); // let Nest handle it
    }
    res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log(`Server running on port ${port}`);
}

bootstrap();