import ValidationService from './validationService';
import { errorMessages } from '../../helpers/constants';

describe('ValidationService', () => {
  const validationService = new ValidationService();

  describe('validateTableSchema', () => {
    it('should throw error if schema is empty', () => {
      expect(() => validationService.validateTableSchema({})).toThrow(
        errorMessages.tableLevel.emptySchema,
      );
    });

    it('should throw error for all not valid types', () => {
      expect(() =>
        validationService.validateTableSchema({
          field1: 'int',
          field2: 'integer',
          field3: 'null',
        }),
      ).toThrow(
        errorMessages.tableLevel.typesNotFound(['field1', 'field3'].join(', ')),
      );
    });
  });

  describe('validateCreateRow', () => {
    it('should throw error if row amount of fields in data is not equal to amount of fields in schema', () => {
      expect(() => {
        validationService.validateCreateRow(
          { field1: 'integer' },
          { field1: '10', field2: '12' },
        );
      }).toThrow(errorMessages.rowLevel.notValidAmountOfFields);
    });

    it('should throw error if field is not given', () => {
      expect(() => {
        validationService.validateCreateRow(
          { field1: 'integer', field2: 'char' },
          { field1: '10', field3: '1' },
        );
      }).toThrow(errorMessages.rowLevel.notFoundFieldInRow('field2'));
    });

    it("should throw error if field's type is not valid", () => {
      expect(() => {
        validationService.validateCreateRow(
          { field1: 'integer', field2: 'char' },
          { field1: '10', field2: '12' },
        );
      }).toThrow(errorMessages.rowLevel.notValidFieldType('field2', 'char'));
    });
  });

  describe('validateUpdateRow', () => {
    it('should throw error if field is not given', () => {
      expect(() => {
        validationService.validateUpdateRow(
          { field1: 'integer', field2: 'char' },
          { field1: '10', field3: '1' },
        );
      }).toThrow(errorMessages.rowLevel.notFoundFieldInSchema('field3'));
    });

    it("should throw error if field's type is not valid", () => {
      expect(() => {
        validationService.validateUpdateRow(
          { field1: 'integer', field2: 'char' },
          { field1: '10', field2: '12' },
        );
      }).toThrow(errorMessages.rowLevel.notValidFieldType('field2', 'char'));
    });
  })
});
