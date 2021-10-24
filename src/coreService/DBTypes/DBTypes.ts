import { errorMessages } from '../../helpers/constants';

class Type {
  private readonly validateFunction: (value: string) => boolean;
  private readonly saveFunction: (value: any) => string;
  private readonly type: string;

  constructor({ validate, save, type }) {
    this.validateFunction = validate;
    this.saveFunction = save;
    this.type = type;
  }

  save(value: string) {
    try {
      return this.saveFunction(value);
    } catch (e) {
      console.error(e);
      throw new Error(errorMessages.typeLevel.saveError(value, this.type));
    }
  }

  validate(value: string) {
    try {
      return this.validateFunction(value);
    } catch (e) {
      console.log(errorMessages.typeLevel.validateError(value, this.type));
      console.error(e);
      return false;
    }
  }
}

export const DBTypes = {
  integer: new Type({
    type: 'integer',
    validate: (value: string) => /^\d+$/.test(value),
    save: (value: number) => value.toString(),
  }),
  real: new Type({
    type: 'real',
    validate: (value: string) => /^\d+(\.\d+)?$/.test(value),
    save: (value) => value,
  }),
  char: new Type({
    type: 'char',
    validate: (value: string) => value.length === 1,
    save: (value) => value,
  }),
  string: new Type({
    type: 'string',
    validate: () => true,
    save: (value) => value,
  }),
};
