import { errorTypes } from './constants';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationError extends HttpException {
  private readonly type: string;

  constructor(message) {
    super(message, HttpStatus.BAD_REQUEST);
    this.type = errorTypes.validationError;
  }
}
