import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const basePort = Number(process.env.APP_PORT ?? 3000);
  const maxAttempts = 10;

  for (let i = 0; i < maxAttempts; i++) {
    const port = basePort + i;
    try {
      await app.listen(port);
      return;
    } catch (err: any) {
      if (err?.code === 'EADDRINUSE') continue;
      throw err;
    }
  }

  throw new Error(`No free port found in range ${basePort}-${basePort + maxAttempts - 1}`);
}
bootstrap();
