import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('API Documentation')
  .addTag('API')
  .build();

export default swaggerConfig;
