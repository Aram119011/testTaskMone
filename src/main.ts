import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MigrationService } from './migration.service';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const migrationService = app.get(MigrationService);
  await migrationService.runMigration();
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
