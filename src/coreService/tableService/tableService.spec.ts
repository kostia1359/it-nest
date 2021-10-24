import TableService from './tableService';
import { ValidationError } from '../../helpers/errors';

describe('TableService', () => {
  let tableService: TableService = null;
  beforeEach(() => {
    tableService = new TableService({
      schema: {
        field1: 'integer',
      },
      data: [
        {
          field1: '22',
        },
        {
          field1: '33',
        },
      ],
    });
  });

  describe('editRow', () => {
    it('should work', () => {
      tableService.editRow(0, {
        field1: '33',
      });

      expect(tableService.table).toStrictEqual([
        {
          field1: '33',
        },
        {
          field1: '33',
        },
      ]);
    });

    it('should throw error if index is not valid', () => {
      expect(() =>
        tableService.editRow(2, {
          field1: '33',
        }),
      ).toThrow(ValidationError);
    });

    it('should throw error if data is not in correct format', () => {
      expect(() =>
        tableService.editRow(1, {
          field2: '33',
        }),
      ).toThrow(ValidationError);
      expect(tableService.table).toStrictEqual([
        {
          field1: '22',
        },
        {
          field1: '33',
        },
      ]);
    });
  });

  describe('createRow', () => {
    it('should work', () => {
      tableService.createRow({
        field1: '44',
      });

      expect(tableService.table).toStrictEqual([
        {
          field1: '22',
        },
        {
          field1: '33',
        },
        {
          field1: '44',
        },
      ]);
    });

    it('should throw error if schema is not valid', () => {
      expect(() =>
        tableService.createRow({
          field2: '33',
        }),
      ).toThrow(ValidationError);

      expect(() =>
        tableService.createRow({
          field1: '3a',
        }),
      ).toThrow(ValidationError);
    });

    it('should throw error if data is not in correct format', () => {
      expect(() =>
        tableService.createRow({
          field2: '33',
        }),
      ).toThrow(ValidationError);
      expect(tableService.table).toStrictEqual([
        {
          field1: '22',
        },
        {
          field1: '33',
        },
      ]);
    });
  });
});
