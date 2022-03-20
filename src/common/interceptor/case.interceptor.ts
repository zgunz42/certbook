import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { isObject, mapKeys, snakeCase } from 'lodash';

@Injectable()
export class CaseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(tap((data) => console.log(data)))
      .pipe(
        map((value) =>
          isObject(value) ? mapKeys(value, (v, k) => snakeCase(k)) : value,
        ),
      );
  }
}
