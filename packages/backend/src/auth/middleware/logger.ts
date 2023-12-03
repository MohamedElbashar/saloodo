import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('Requests');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url } = req;

    // Log information about the incoming request
    this.logger.log(`Incoming request: ${method} ${url}`);

    // Listen for the 'finish' event on the response to log information about the outgoing response
    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(`Outgoing response: ${statusCode}`);
    });

    // Call the next middleware or route handler in the chain
    next();
  }
}
