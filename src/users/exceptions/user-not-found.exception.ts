import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        error: 'User not found',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
