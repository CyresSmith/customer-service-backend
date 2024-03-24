import { Employee } from 'db/entities';

export interface IBasicEmployeeInfo
  extends Pick<
    Employee,
    | 'id'
    | 'role'
    | 'jobTitle'
    | 'status'
    | 'user'
    | 'firstName'
    | 'lastName'
    | 'phone'
    | 'email'
    | 'provider'
  > {}

export interface IBasicEmployee
  extends Pick<
    Employee,
    'id' | 'avatar' | 'firstName' | 'lastName' | 'status' | 'jobTitle'
  > {
  servicesCount: number;
}
