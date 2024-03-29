import { ValidationError } from '../../helpers/errors';
import { errorMessages } from '../../helpers/constants';
import TableService from '../tableService/tableService';
import ValidationService from '../validationService/validationService';
import { Dictionary, Table } from '../../helpers/types';
import * as _ from 'lodash';

export default class DbService {
  private validationService: ValidationService;
  private tables: Table[];
  tableService: null | TableService;

  constructor(tables: Table[]) {
    this.validationService = new ValidationService();
    this.tables = tables;
    this.tableService = null;
  }

  private isTableExist(name: string) {
    return this.tables.some(
      ({ tableName }) => tableName === name.toLowerCase(),
    );
  }

  createTable({
    tableName,
    schema,
  }: {
    tableName: string;
    schema: Dictionary;
  }) {
    const isNameUniq = !this.isTableExist(tableName);
    if (!isNameUniq) {
      throw new ValidationError(errorMessages.tableLevel.alreadyExists);
    }
    this.validationService.validateTableSchema(schema);

    const createdTable: Table = {
      tableName,
      schema,
      data: [],
    };
    this.tables.push(createdTable);
    this.tableService = new TableService(createdTable);
  }

  selectTable(name: string) {
    const isTableExist = this.isTableExist(name);
    if (!isTableExist) {
      throw new ValidationError(errorMessages.tableLevel.notFound);
    }

    const selectedTable = this.tables.find(
      ({ tableName }) => tableName === name.toLowerCase(),
    );
    this.tableService = new TableService(selectedTable);
  }

  removeTable(name: string) {
    const isTableExist = this.isTableExist(name);
    if (!isTableExist) {
      throw new ValidationError(errorMessages.tableLevel.notFound);
    }

    this.tables = this.tables.filter(
      ({ tableName }) => tableName !== name.toLowerCase(),
    );
    this.tableService = null;
  }
  mergeTables(name: string) {
    if (!this.tableService) {
      throw new ValidationError(errorMessages.tableLevel.notSelected);
    }

    if (!this.isTableExist(name)) {
      throw new ValidationError(errorMessages.tableLevel.notFound);
    }

    const tableToMerge = this.tables.find(
      ({ tableName }) => tableName === name.toLowerCase(),
    );
    const tableServiceToMerge = new TableService(tableToMerge);
    if (
      !_.isEqual(this.tableService.tableSchema, tableServiceToMerge.tableSchema)
    ) {
      throw new ValidationError(errorMessages.tableLevel.schemasNotEqual);
    }

    return [
      ..._.differenceWith(
        this.tableService.table,
        tableServiceToMerge.table,
        _.isEqual,
      ),
      ..._.differenceWith(
        tableServiceToMerge.table,
        this.tableService.table,
        _.isEqual,
      ),
      ..._.intersectionWith(
        tableServiceToMerge.table,
        this.tableService.table,
        _.isEqual,
      ),
    ];
  }

  get tableNames() {
    return this.tables.map(({ tableName }) => tableName);
  }
}
