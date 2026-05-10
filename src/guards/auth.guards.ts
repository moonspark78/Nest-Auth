import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private JwtService: JwtService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException("No token provided");
        }
        try {
            const payload = this.JwtService.verify(token);
        } catch (e) {
            throw new UnauthorizedException("Invalid token");
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        return request.headers.authorization?.split(' ')[1];
    }
}