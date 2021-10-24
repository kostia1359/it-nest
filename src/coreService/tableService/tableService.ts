import ValidationService from '../validationService/validationService';
import { DBTypes } from '../DBTypes/DBTypes';
import { ValidationError } from '../../helpers/errors';
import { errorMessages } from '../../helpers/constants';
import { Dictionary } from '../../helpers/types';

export default class TableService {
  private validationService: ValidationService;
  private readonly schema: Dictionary;
  private readonly data: Array<Dictionary>;

  constructor({
    schema,
    data,
  }: {
    schema: Dictionary;
    data: Array<Dictionary>;
  }) {
    this.validationService = new ValidationService();
    this.schema = schema;
    this.data = data;
  }

  private createRowData(row: Dictionary, initialData: Dictionary): Dictionary {
    return Object.entries(row).reduce((row, [fieldName, fieldValue]) => {
      const fieldType = this.schema[fieldName];

      return {
        ...row,
        [fieldName]: DBTypes[fieldType].save(fieldValue),
      };
    }, initialData);
  }

  createRow(row: Dictionary) {
    this.validationService.validateCreateRow(this.schema, row);
    this.data.push(this.createRowData(row, {}));
  }

  editRow(index: number, row: Dictionary) {
    const rowData = this.data[index];
    if (!rowData) {
      throw new ValidationError(errorMessages.rowLevel.notFound);
    }

    this.validationService.validateUpdateRow(this.schema, row);
    this.data[index] = this.createRowData(row, rowData);
  }

  get table() {
    return this.data;
  }

  get tableSchema() {
    return this.schema;
  }
}
