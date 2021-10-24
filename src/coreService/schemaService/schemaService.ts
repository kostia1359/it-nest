import { ValidationError } from '../../helpers/errors';
import { errorMessages } from '../../helpers/constants';
import DbService from '../dbService/dbService';
import { Database } from '../../helpers/types';

export default class SchemaService {
  private readonly schemas: Database[];
  dbService: DbService | null;

  constructor(schemas: Database[]) {
    this.dbService = null;
    this.schemas = schemas;
  }

  private isDbExist(name: string) {
    return this.schemas.some(({ dbName }) => dbName === name.toLowerCase());
  }

  createDb(name: string) {
    const dbName = name.toLowerCase();
    const isNameUniq = !this.isDbExist(dbName);
    if (!isNameUniq) {
      throw new ValidationError(errorMessages.dbLevel.alreadyExists);
    }

    const createdDb: Database = {
      dbName,
      tables: [],
    };
    this.schemas.push(createdDb);
    this.selectDb(dbName);
    // this.dbService = new DbService(createdDb.tables);
  }

  selectDb(name: string) {
    const isDbExist = this.isDbExist(name);
    if (!isDbExist) {
      throw new ValidationError(errorMessages.dbLevel.notFound);
    }
    const selectedDBSchema = this.schemas.find(
      ({ dbName }) => dbName === name.toLowerCase(),
    );
    this.dbService = new DbService(selectedDBSchema.tables);
  }

  get schemaNames() {
    return this.schemas.map(({ dbName }) => dbName);
  }

  get dbSchema() {
    return this.schemas;
  }
}
