import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/services/auth.service';
import { AccessTokenData, Request } from '@unihosp/api-interface';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  private logger = new Logger(AccessTokenGuard.name);

  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (
      request.headers['x-api-key'] === this.configService.get('DEVELOPMENT_KEY')
    )
      return true;
    else {
      this.logger.debug(`Validating`);
      const authorization = `unihosp ${request.cookies['accessToken']}`;
      const user = authorization ? this.validate(authorization) : undefined;
      this.logger.log(user);
      if (!user) return false;
      request.user = user;
      return true;
    }
  }

  private validate(authorization: string): AccessTokenData {
    const { user } = this.authService.verify(authorization);
    return user;
  }
}
