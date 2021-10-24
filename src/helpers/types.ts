export type Dictionary = Record<string, string>;

export type Table = {
  tableName: string;
  schema: Dictionary;
  data: Dictionary[];
};

export type Database = {
  dbName: string;
  tables: Table[];
};
