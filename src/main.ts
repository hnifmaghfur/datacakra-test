import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // setup swagger for documentation API
  const config = new DocumentBuilder()
    .setTitle('Datacakra Test')
    .setDescription('API Collection for Datacakra Test')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  patchNestjsSwagger();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Error during initials :', err);
});
