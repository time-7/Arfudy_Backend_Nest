import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ResourceNotFoundError } from '@core/errors/errors/resource-not-found.error';

@Catch(ResourceNotFoundError)
export class ResourceNotFoundFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const statusCode = HttpStatus.NOT_FOUND;

    res.status(statusCode).json({
      statusCode,
      message: exception.message,
      error: 'recurso não encontrado',
    });
  }
}
