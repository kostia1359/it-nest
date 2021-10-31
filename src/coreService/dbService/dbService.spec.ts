import DbService from './dbService';
import { ValidationError } from '../../helpers/errors';
import { errorMessages } from '../../helpers/constants';

describe.only('DbService', () => {
  let dbService: DbService = null;
  beforeEach(() => {
    dbService = new DbService([
      {
        tableName: 'test',
        schema: {
          field1: 'integer',
        },
        data: [
          {
            field1: '22',
          },
        ],
      },
      {
        tableName: 'test1',
        schema: {
          field2: 'integer',
        },
        data: [
          {
            field2: '12',
          },
          {
            field2: '13',
          },
        ],
      },
    ]);
  });

  it('should get table names', () => {
    expect(dbService.tableNames).toStrictEqual(['test', 'test1']);
  });

  describe('createTable', () => {
    it('should throw error if name is not uniq', () => {
      expect(() =>
        dbService.createTable({
          tableName: 'test',
          schema: {
            field2: 'integer',
          },
        }),
      ).toThrow(ValidationError);
    });

    it('should create table with uniq name', () => {
      dbService.createTable({
        tableName: 'test2',
        schema: {
          field2: 'integer',
        },
      });

      expect(dbService.tableNames).toStrictEqual(['test', 'test1', 'test2']);
    });

    it('should throw error if schema is not valid', () => {
      expect(() =>
        dbService.createTable({
          tableName: 'test2',
          schema: {
            field2: 'int',
          },
        }),
      );
    });
  });

  describe('removeTable', () => {
    it('should throw error when you remove table that not exist', () => {
      expect(() => dbService.removeTable('test2')).toThrow(ValidationError);
    });

    it('should remove table', () => {
      dbService.removeTable('test1');

      expect(dbService.tableNames).toStrictEqual(['test']);
    });
  });

  describe('selectTable', () => {
    it('should not select table with name that not exist', () => {
      expect(() => dbService.selectTable('test2')).toThrow(ValidationError);
      expect(dbService.tableService).toStrictEqual(null);
    });

    it('should select table', () => {
      dbService.selectTable('test');
      expect(dbService.tableService.table).toStrictEqual([
        {
          field1: '22',
        },
      ]);

      dbService.selectTable('test1');
      expect(dbService.tableService.table).toStrictEqual([
        {
          field2: '12',
        },
        {
          field2: '13',
        },
      ]);
    });
  });

  describe('mergeTables', () => {
    it('should throw error if table is not selected', () => {
      expect(() => dbService.mergeTables('test1')).toThrow(
        errorMessages.tableLevel.notSelected,
      );
    });

    it('should throw error if table to merge not exist', () => {
      dbService.selectTable('test1');
      expect(() => dbService.mergeTables('test2')).toThrow(
        errorMessages.tableLevel.notFound,
      );
    });

    it('should throw error if schemas differ', () => {
      dbService.selectTable('test');
      expect(() => dbService.mergeTables('test1')).toThrow(
        errorMessages.tableLevel.schemasNotEqual,
      );
    });

    it('should merge tables correctly', () => {
      dbService.createTable({
        tableName: 'test2',
        schema: {
          field1: 'integer',
        },
      });
      dbService.tableService.createRow({ field1: '1234' });
      dbService.tableService.createRow({ field1: '12345' });
      dbService.tableService.createRow({ field1: '22' });

      expect(dbService.mergeTables('test')).toStrictEqual([
        { field1: '1234' },
        { field1: '12345' },
        { field1: '22' },
      ]);
    });
  });
});
