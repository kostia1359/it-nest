import { Database } from '../helpers/types';

export interface IStorageEngine {
  read: () => Promise<Database[]>;
  save: (schema: Database[]) => Promise<void>;
}
