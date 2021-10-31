import { IStorageEngine } from './IStorageEngine';
import { Database } from '../helpers/types';
import * as fs from 'fs';
import { errorMessages } from '../helpers/constants';
import { env } from '../env';
import { MongoClient } from 'mongodb';

const client = new MongoClient(env.STORAGE_SERVICE.MONGO.URI);

export default class MongoDBStorageEngine implements IStorageEngine {
  public async read(): Promise<Database[]> {
    try {
      await client.connect();

      const db = await client.db(env.STORAGE_SERVICE.MONGO.DB_NAME);
      return db
        .collection(env.STORAGE_SERVICE.MONGO.COLLECTION_NAME)
        .find()
        .toArray() as Promise<Database[]>;
    } catch (e) {
      await client.close();

      console.error(errorMessages.storageEngine.read);
      throw e;
    }
  }

  public async save(schema: Database[]): Promise<void> {
    try {
      const db = await client.db(env.STORAGE_SERVICE.MONGO.DB_NAME);

      const collection = db.collection(
        env.STORAGE_SERVICE.MONGO.COLLECTION_NAME,
      );

      await collection.deleteMany({});
      await collection.insertMany(schema);

      return Promise.resolve(undefined);
    } catch (e) {
      await client.close();

      console.error(errorMessages.storageEngine.save);
      throw e;
    }
  }
}
