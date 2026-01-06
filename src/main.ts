import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule , {
    bufferLogs : true
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true,
      forbidNonWhitelisted : true,
      transform : true,
      transformOptions :{
          enableImplicitConversion: false
      }
    })
  )

    // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Accounts Microservice ')
    .setDescription('API docs for Accounts microservice')
    .setVersion('1.0')
    .addBearerAuth() // for JWT auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // app.useLogger(app.get(Logger))


  //versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport : Transport.KAFKA,
  //   options : {
  //     client : { brokers : ['localhost : 9091'] },
  //     consumer : { groupId : 'auth-consumer' }
  //   }
  // })  
  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
