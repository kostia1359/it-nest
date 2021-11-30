import { IStorageEngine } from './IStorageEngine';
import { Database } from '../helpers/types';
import * as fs from 'fs';
import { errorMessages } from '../helpers/constants';
import { env } from '../env';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: env.STORAGE_SERVICE.AWS.KEY_ID,
  secretAccessKey: env.STORAGE_SERVICE.AWS.SECRET_KEY
});

export default class AwsStorageEngine implements IStorageEngine {
  public async read(): Promise<Database[]> {
    try {
      const options = {
        Bucket: env.STORAGE_SERVICE.AWS.BUCKET_NAME,
        Key: env.STORAGE_SERVICE.AWS.FILE_NAME
      }
      const file = await s3.getObject(options).promise();
      const schema = file.Body.toString('utf-8');
      return Promise.resolve(JSON.parse(schema));
    } catch (e) {
      console.error(errorMessages.storageEngine.read);
      throw e;
    }
  }

  public async save(schema: Database[]): Promise<void> {
    try {
      const options = {
        Bucket: env.STORAGE_SERVICE.AWS.BUCKET_NAME,
        Key: env.STORAGE_SERVICE.AWS.FILE_NAME,
        Body: JSON.stringify(schema, null, 4),
      }
      await s3.deleteObject({
        Bucket: env.STORAGE_SERVICE.AWS.BUCKET_NAME,
        Key: env.STORAGE_SERVICE.AWS.FILE_NAME
      }).promise()
      await s3.upload(options).promise();
      return Promise.resolve(undefined);
    } catch (e) {
      console.error(errorMessages.storageEngine.save);
      throw e;
    }
  }
}
