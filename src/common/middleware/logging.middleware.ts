import { Injectable, NestMiddleware } from '@nestjs/common';
import * as morgan from 'morgan';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (process.env.NODE_ENV === 'development') {
      morgan('dev')(req, res, next);
    } else {
      next();
    }
  }
}
