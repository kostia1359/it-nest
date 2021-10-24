import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchemaModule } from './schema/schema.module';

@Module({
  imports: [SchemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
