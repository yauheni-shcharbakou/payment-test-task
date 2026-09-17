import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private parseExceptionResponse(res: string | object): string {
    console.log(res);

    if (typeof res === 'object') {
      if (Array.isArray(res)) {
        return res.map((part) => String(part)).join(', ');
      }

      const resMessage = res['message'] as string | string[];

      if (Array.isArray(resMessage)) {
        return resMessage.map((part) => String(part)).join('; ');
      }

      if (typeof resMessage !== 'string') {
        return 'Unknown exception';
      }

      return res['message'];
    }

    return res;
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const statusCode = exception.getStatus();

    return response.status(statusCode).json({
      statusCode,
      message: this.parseExceptionResponse(exception.getResponse()),
    });
  }
}
