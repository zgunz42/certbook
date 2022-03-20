import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware<Request, Response> {
  use(req: Request, res: Response, next: () => void) {
    console.log(`ip ${req.ip} => ${req.url} with method ${req.method}`);
    next();
  }
}
