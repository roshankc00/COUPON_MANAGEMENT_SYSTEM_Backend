import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:3000', process.env.CLIENT_URL],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies
};

@Injectable()
export class CorsInterceptor implements NestInterceptor {
  constructor(private readonly corsOptions: CorsOptions) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        if (context.switchToHttp().getRequest().method === 'OPTIONS') {
          context.switchToHttp().getResponse().end();
        }
      }),
    );
  }
}
