import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'colors';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Home Library Service',
        description: 'Home music library service',
        version: '1.0.0',
      },
    },
    apis: ['doc/api.yaml'],
  };

  const specs = swaggerJsdoc(options);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

  await app.listen(PORT, () => {
    console.log(`⚙️  Server running on port ${PORT}`.blue.inverse);
  });
}
bootstrap();
