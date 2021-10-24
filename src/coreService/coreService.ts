import SchemaService from './schemaService/schemaService';

class CoreService extends SchemaService {
  constructor(schemas) {
    super(schemas);
  }

  createTable({ tableName, schema }) {
    this.dbService.createTable({ tableName, schema });
  }

  selectTable(name) {
    this.dbService.selectTable(name);
  }

  removeTable(name) {
    this.dbService.removeTable(name);
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

module.exports = CoreService;
