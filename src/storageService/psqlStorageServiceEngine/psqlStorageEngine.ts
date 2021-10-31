import { IStorageEngine } from '../IStorageEngine';
import { Database } from '../../helpers/types';
import { env } from '../../env';
import { errorMessages } from '../../helpers/constants';
import { Client } from 'pg';
import { json } from 'express';

const client = new Client({
  user: env.STORAGE_SERVICE.PSQL.USER,
  host: env.STORAGE_SERVICE.PSQL.HOST,
  database: env.STORAGE_SERVICE.PSQL.DATABASE,
  password: env.STORAGE_SERVICE.PSQL.PASSWORD,
  port: env.STORAGE_SERVICE.PSQL.PORT,
});

export default class PsqlStorageEngine implements IStorageEngine {
  public async read(): Promise<Database[]> {
    try {
      await client.connect();

      const schemas = await client
        .query(`SELECT * FROM ${env.STORAGE_SERVICE.PSQL.TABLE_NAME}`)
        .then(({ rows }) => rows[0][env.STORAGE_SERVICE.PSQL.COLUMN_NAME]);

      return schemas;
    } catch (e) {
      await client.end();

      console.error(errorMessages.storageEngine.read);
      throw e;
    }
  }

  public async save(schema: Database[]): Promise<void> {
    try {
      await client.query(`TRUNCATE ${env.STORAGE_SERVICE.PSQL.TABLE_NAME}`);
      await client.query(
        `INSERT INTO ${env.STORAGE_SERVICE.PSQL.TABLE_NAME} (${
          env.STORAGE_SERVICE.PSQL.COLUMN_NAME
        }) values ('${JSON.stringify(schema)}');`,
      );

      return Promise.resolve(undefined);
    } catch (e) {
      await client.end();

      console.error(errorMessages.storageEngine.save);
      throw e;
    }
  }
}
