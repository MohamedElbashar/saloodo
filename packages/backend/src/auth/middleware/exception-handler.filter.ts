import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CustomHttpExceptionResponse } from './types';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(ExceptionsFilter.name);
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof BadRequestException) {
      status = exception.getStatus();
      errorMessage = exception.getResponse() as string;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorMessage = exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = (exception as Error).message;
    }

    this.logger.error(`Http Status: ${status} Error Message: ${errorMessage}`);

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: errorMessage,
    });
  }

  private getErrorResponse = (
    status: HttpStatus,
    errorMessage: string,
    request: Request,
  ): CustomHttpExceptionResponse => ({
    statusCode: status,
    error: errorMessage,
    path: request.url,
    method: request.method,
    timeStamp: new Date(),
  });
}
