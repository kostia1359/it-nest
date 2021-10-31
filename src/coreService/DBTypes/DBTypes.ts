import { errorMessages } from '../../helpers/constants';
import { chunk } from 'lodash';

class Type {
  private readonly validateFunction: (value: string) => boolean;
  private readonly saveFunction: (value: any) => string;
  private readonly type: string;

  constructor({ validate, save = (value) => value, type }) {
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
  }),
  char: new Type({
    type: 'char',
    validate: (value: string) => value.length === 1,
  }),
  string: new Type({
    type: 'string',
    validate: () => true,
  }),
  charInvl: new Type({
    type: 'charInvl',
    validate: (value: string) => {
      const isInterval = /^.-.$/.test(value);

      return isInterval && value[0] < value[2];
    },
  }),
  'string(charInvl)': new Type({
    type: 'string(charInvl)',
    validate: (value: string) => {
      const isIntervals = /^(.-.)+$/.test(value);
      const isValidIntervals = chunk(value.split(''), 3).every(
        ([firstSymbol, , thirdSymbol]) => {
          return firstSymbol < thirdSymbol;
        },
      );

      return isIntervals && isValidIntervals;
    },
  }),
};
