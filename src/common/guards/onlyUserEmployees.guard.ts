import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class OnlyUserEmployeesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some(role => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const { user, params, query } = context.switchToHttp().getRequest();

    if (
      user &&
      user?.employees &&
      params?.employeeId &&
      (params?.companyId || query?.companyId)
    ) {
      const employee = user.employees.find(
        ({ id }) => +id === +params.employeeId
      );

      if (!employee) return false;

      return this.matchRoles(roles, employee.role);
    }

    return false;
  }
}
