import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    let status: HttpStatus;

    this.logger.error(
      `Prisma error message: ${exception.message} PrismaClientKnownRequestErrorCode: ${exception.code}`,
    );

    if (exception.code === 'P2014') {
      status = HttpStatus.BAD_REQUEST;

      res.status(status).json({
        statusCode: status,
        message: exception.message,
        prismaErrorCode: exception.code,
      });
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;

      res.status(status).json({
        statusCode: status,
        message: exception.message,
        prismaErrorCode: exception.code,
      });
    }
  }
}
