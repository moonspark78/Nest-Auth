import { Injectable, type CanActivate, type ExecutionContext } from "@nestjs/common";
import type { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private JwtService: JwtService) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
    }
    private extractTokenFromHeader(request: Request) {
        throw new Error("Method not implemented.");
    }
}