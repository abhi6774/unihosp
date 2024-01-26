import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { SocketIOAdapter } from './socketServices/socket.adapter';

const port = process.env.PORT || 3000;

async function bootstrap() {
  console.log(3000)
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
      "https://unihosp.live",
      "http://unihosp.live",
    ],
    credentials: true
  })

  app.setGlobalPrefix("api/v1/", {});
  app.useWebSocketAdapter(new SocketIOAdapter(app));
  await app.listen(port);
}
bootstrap().catch(() => { });
