import { Injectable, type CanActivate } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {}