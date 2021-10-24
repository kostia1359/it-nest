import { errorTypes } from './constants';

export class ValidationError extends Error {
  private readonly type: string;

  constructor(message) {
    super(message);
    this.type = errorTypes.validationError;
  }
}
