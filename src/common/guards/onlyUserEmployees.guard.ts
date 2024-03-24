import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../enums';

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
      const userEmployee = user?.employees?.find(employee =>
        employee?.company?.id === +params?.companyId
          ? +params?.companyId
          : +query?.companyId
      );

      if (
        userEmployee &&
        (userEmployee.role === RolesEnum.OWNER ||
          userEmployee.role === RolesEnum.ADMIN)
      ) {
        return true;
      }

      const employee = user.employees.find(
        ({ id }) => +id === +params.employeeId
      );

      if (!employee) return false;

      return this.matchRoles(roles, employee.role);
    }

    return false;
  }
}
