import { IStorageEngine } from './IStorageEngine';
import { Database } from '../helpers/types';
import * as fs from 'fs';
import { errorMessages } from '../helpers/constants';
import { env } from '../env';

export default class LocalStorageEngine implements IStorageEngine {
  public async read(): Promise<Database[]> {
    try {
      const schema = fs.readFileSync(env.STORAGE_SERVICE.JSON.READ, 'utf-8');
      return Promise.resolve(JSON.parse(schema));
    } catch (e) {
      console.error(errorMessages.storageEngine.read);
      throw e;
    }
  }

  public async save(schema: Database[]): Promise<void> {
    try {
      fs.writeFileSync(
        env.STORAGE_SERVICE.JSON.READ,
        JSON.stringify(schema, null, 4),
      );
      return Promise.resolve(undefined);
    } catch (e) {
      console.error(errorMessages.storageEngine.save);
      throw e;
    }
  }
}
