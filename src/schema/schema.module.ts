import { Module } from '@nestjs/common';
import { SchemaController } from './schema.controller';

@Module({
  imports: [],
  controllers: [SchemaController],
})
export class SchemaModule {}
