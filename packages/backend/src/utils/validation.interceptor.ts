import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError(err => {
        if (
          err instanceof BadRequestException &&
          Array.isArray((err.getResponse() as any)?.message)
        ) {
          const response = err.getResponse() as any;

          const antdErrors = this.flattenErrors(response.message);

          return throwError(
            () =>
              new UnprocessableEntityException({
                statusCode: 422,
                message: 'Validation failed',
                errors: antdErrors,
              }),
          );
        }

        return throwError(() => err);
      }),
    );
  }

  /** Chuyển đổi ValidationError thành format của Ant Design */
  private flattenErrors(errors: string[]): any[] {
    const errorMap: Record<string, string[]> = {};

    for (const error of errors) {
      const split = error.split(' ');
      const isWhere = false;
      const fieldName = isWhere ? split[1] : split[0];
      const errorMessage = isWhere
        ? split.slice(1).join(' ')
        : split.slice(0).join(' ');
      if (!errorMap[fieldName]) {
        errorMap[fieldName] = [];
      }
      errorMap[fieldName].push(errorMessage);
    }

    return Object.entries(errorMap).map(([name, errs]) => ({
      name: name
        .split('.')
        .map(item => (/[0-9]+/.test(item) ? parseInt(item) : item)),
      errors: errs,
    }));
  }
}
