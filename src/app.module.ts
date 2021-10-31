import { Module } from '@nestjs/common';
import { SchemaModule } from './schema/schema.module';
import { SharedModule } from './shared.module';

@Module({
  imports: [SchemaModule, SharedModule],
})
export class AppModule {}
