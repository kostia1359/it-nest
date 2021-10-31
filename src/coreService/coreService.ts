import SchemaService from './schemaService/schemaService';
import { Injectable } from '@nestjs/common';
import { IStorageEngine } from '../storageService/IStorageEngine';
import { Dictionary } from '../helpers/types';

@Injectable()
export default class CoreService extends SchemaService {
  private storageEngine: IStorageEngine;
  constructor(storageEngine: IStorageEngine, schemas) {
    super(schemas);

    this.storageEngine = storageEngine;
  }

  saveSchema(): Promise<void> {
    return this.storageEngine.save(this.schemas);
  }

  createTable({
    tableName,
    schema,
  }: {
    tableName: string;
    schema: Dictionary;
  }) {
    this.dbService.createTable({ tableName, schema });
  }

  selectTable(name) {
    this.dbService.selectTable(name);
  }

  removeTable(name) {
    this.dbService.removeTable(name);
  }

  mergeTables(name) {
    return this.dbService.mergeTables(name);
  }

  get tableNames() {
    return this.dbService.tableNames;
  }

  createRow(row) {
    this.dbService.tableService.createRow(row);
  }

  editRow(index, row) {
    this.dbService.tableService.editRow(index, row);
  }

  get table() {
    return this.dbService.tableService.table;
  }
}
