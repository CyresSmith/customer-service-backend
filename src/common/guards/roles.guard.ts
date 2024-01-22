import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some(role => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const { user, params } = context.switchToHttp().getRequest();

    if (user && user?.employees && params?.companyId) {
      const employee = user?.employees?.find(
        employee => employee?.company?.id === Number(params?.companyId)
      );

      return this.matchRoles(roles, employee.role);
    }

    return false;
  }
}
