import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './socketServices/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://127.0.0.1:4200',
      'http://127.0.0.1:3020',
      'http://localhost:3020',
      'http://localhost:5500',
      'http://127.0.0.1:5500',
    ],
    credentials: true
  })

  app.setGlobalPrefix("api/v1/", {});
  app.useWebSocketAdapter(new SocketIOAdapter(app));
  await app.listen(3000);
}
bootstrap().catch(() => { });
