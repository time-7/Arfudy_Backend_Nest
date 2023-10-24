import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { TableInUseError } from '@domain/restaurant/application/use-cases/errors/table-in-use.error';

@Catch(TableInUseError)
export class TableInUseFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const statusCode = HttpStatus.CONFLICT;

    res.status(statusCode).json({
      statusCode,
      message: exception.message,
      error: 'Mesa já está em uso',
    });
  }
}
