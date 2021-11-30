import * as convict from 'convict';
import * as dotenv from 'dotenv';
import * as path from 'path';

const envFilePath = path.join(process.cwd(), '.env');

dotenv.config({ path: envFilePath });

const config = convict({
  STORAGE_SERVICE: {
    JSON: {
      READ: {
        doc: 'path to read json from local system',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_JSON_READ',
      },
      WRITE: {
        doc: 'path to write json to local system',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_JSON_WRITE',
      },
    },
    MONGO: {
      URI: {
        doc: 'URI to connect to MONGO with password and database name included',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_MONGO_URI',
      },
      COLLECTION_NAME: {
        doc: 'collection to save schemas',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_MONGO_COLLECTION_NAME',
      },
      DB_NAME: {
        doc: 'database name to save schemas',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_MONGO_DB_NAME',
      },
    },
    PSQL: {
      USER: {
        doc: 'psql user',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_PSQL_USER',
      },
      HOST: {
        doc: 'psql host',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_PSQL_HOST',
      },
      DATABASE: {
        doc: 'psql database name',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_PSQL_DATABASE',
      },
      PASSWORD: {
        doc: 'psql password',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_PSQL_PASSWORD',
      },
      PORT: {
        doc: 'psql port',
        format: Number,
        default: null,
        env: 'STORAGE_SERVICE_PSQL_PORT',
      },
      TABLE_NAME: {
        doc: 'psql table name which would be used for reading and writing',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_PSQL_TABLE_NAME',
      },
      COLUMN_NAME: {
        doc: 'psql column name which would be used for reading and writing',
        format: String,
        default: '',
        env: 'STORAGE_SERVICE_PSQL_COLUMN_NAME',
      },
    },
    AWS: {
      KEY_ID: {
        doc: 'aws key id',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_AWS_KEY_ID',
      },
      SECRET_KEY: {
        doc: 'aws secret key',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_AWS_SECRET_KEY',
      },
      BUCKET_NAME: {
        doc: 'aws bucket name',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_AWS_BUCKET_NAME',
      },
      FILE_NAME: {
        doc: 'aws bucket name',
        format: String,
        default: null,
        env: 'STORAGE_SERVICE_AWS_FILE_NAME',
      },
    },
  },
});

config.validate();

export const env = config.get();
