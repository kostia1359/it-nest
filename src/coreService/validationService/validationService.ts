import { DBTypes } from '../DBTypes/DBTypes';
import { errorMessages } from '../../helpers/constants';
import { ValidationError } from '../../helpers/errors';
import { Dictionary } from '../../helpers/types';

export default class ValidationService {
  private availableTypes: string[];
  constructor() {
    this.availableTypes = Object.keys(DBTypes);
  }

  validateTableSchema(schema: Dictionary) {
    if (!Object.keys(schema).length) {
      throw new ValidationError(errorMessages.tableLevel.emptySchema);
    }

    const errors = [];
    Object.entries(schema).forEach(([fieldName, fieldType]) => {
      const isTypeValid = this.availableTypes.includes(fieldType);
      if (!isTypeValid) {
        errors.push(fieldName);
      }
    });

    if (errors.length) {
      throw new ValidationError(
        errorMessages.tableLevel.typesNotFound(errors.join(', ')),
      );
    }
  }

  validateCreateRow(schema: Dictionary, row: Dictionary) {
    const isFieldsAmountValid =
      Object.keys(schema).length === Object.keys(row).length;
    if (!isFieldsAmountValid) {
      throw new ValidationError(errorMessages.rowLevel.notValidAmountOfFields);
    }

    Object.entries(schema).forEach(([fieldName, fieldType]) => {
      const rowField = row[fieldName];
      if (!rowField) {
        throw new ValidationError(
          errorMessages.rowLevel.notFoundFieldInRow(fieldName),
        );
      }

      const isValueValid = DBTypes[fieldType].validate(rowField);
      if (!isValueValid) {
        throw new ValidationError(
          errorMessages.rowLevel.notValidFieldType(fieldName, fieldType),
        );
      }
    });
  }

  validateUpdateRow(schema: Dictionary, row: Dictionary) {
    Object.entries(row).forEach(([fieldName, fieldValue]) => {
      const fieldType = schema[fieldName];
      if (!fieldType) {
        throw new ValidationError(
          errorMessages.rowLevel.notFoundFieldInSchema(fieldName),
        );
      }

      const isValueValid = DBTypes[fieldType].validate(fieldValue);
      if (!isValueValid) {
        throw new ValidationError(
          errorMessages.rowLevel.notValidFieldType(fieldName, fieldType),
        );
      }
    });
  }
}
