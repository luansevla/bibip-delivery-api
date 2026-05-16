import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Phone Management API')
    .setDescription(
      'API robusta para gerenciamento de telefones, integrada com MongoDB e pronta para Pagar.me.<br>' +
        '<i>Utilize as rotas abaixo para realizar operações de CRUD.</i>',
    )
    .setVersion('1.0.0')
    .addTag('Phones', 'Operações relacionadas ao cadastro de telefones')
    .addBearerAuth() // Caso você adicione autenticação no futuro
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'BIBIP API Documentation',
  });

  // 5. Porta e Inicialização
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`==========================================================`);
  logger.log(`🚀 Application is running on: http://localhost:${port}/api/v1`);
  logger.log(
    `📖 Documentation is available at: http://localhost:${port}/api/docs`,
  );
  logger.log(`==========================================================`);
}

void bootstrap();
