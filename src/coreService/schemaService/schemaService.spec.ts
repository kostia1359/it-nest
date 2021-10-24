import SchemaService from './schemaService';
import { ValidationError } from '../../helpers/errors';

describe('SchemaService', () => {
  let schemaService: SchemaService = null;
  beforeEach(() => {
    schemaService = new SchemaService([
      {
        dbName: 'test',
        tables: [
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
        ],
      },
    ]);
  });

  describe('createDb', () => {
    it('should throw error if db name exists', () => {
      expect(() => schemaService.createDb('test')).toThrow(ValidationError);
    });

    it('should create db with uniq name', () => {
      schemaService.createDb('test1');
      expect(schemaService.schemaNames).toStrictEqual(['test', 'test1']);
    });
  });

  describe('selectDb', () => {
    it('should throw error if db does not exist', () => {
      expect(() => schemaService.selectDb('test1')).toThrow(ValidationError);
    });

    it('should select db', () => {
      expect(schemaService.dbService).toStrictEqual(null);
      schemaService.selectDb('test');
      expect(schemaService.dbService.tableNames).toStrictEqual([
        'test',
        'test1',
      ]);
    });
  });
});
