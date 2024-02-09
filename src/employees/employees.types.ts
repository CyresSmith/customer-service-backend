import { Employee } from 'db/entities';

export interface IBasicEmployeeInfo
  extends Pick<Employee, 'id' | 'role' | 'jobTitle' | 'status' | 'user'> {}
