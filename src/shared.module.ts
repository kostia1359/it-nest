import { Global, Module } from '@nestjs/common';
import CoreService from './coreService/coreService';
import LocalStorageEngine from './storageService/localStorageEngine';
import MongoDBStorageEngine from './storageService/mongoDBStorageEngine';
import PsqlStorageEngine from './storageService/psqlStorageServiceEngine/psqlStorageEngine';
import AwsStorageEngine from './storageService/awsStorageEngine';

const coreServiceProvider = {
  provide: CoreService,
  useFactory: async () => {
    const storageEngine = new AwsStorageEngine();
    const schemas = await storageEngine.read();

    return new CoreService(storageEngine, schemas);
  },
};

@Global()
@Module({
  providers: [coreServiceProvider],
  exports: [coreServiceProvider],
})
export class SharedModule {}
