import * as _ from 'lodash';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

console.log(_.isEqual({a:10, b:20}, {b:20, a:10}))