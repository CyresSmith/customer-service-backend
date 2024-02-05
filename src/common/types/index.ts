import { IBasicUserInfo } from 'src/users/users.types';

export type MessageResponse = {
  message: string;
};

export interface ICreateUserResponse extends MessageResponse {
  user: IBasicUserInfo;
}

export interface ISchedule {
  from: string;
  to: string;
}

export interface IWorkSchedule extends ISchedule {
  days: number[];
}

export type IWorkingHours = IWorkSchedule[];

export type JobTitle = 'admin' | 'master';

export type CategoryType = 'employee' | 'service' | 'product' | 'activity';

export type ScheduleType = 'employee' | 'recourse';

export type ActionType = 'sale' | 'service';

export type EmployeeStatus = 'working' | 'fired';

export type Gender = 'male' | 'female' | 'other';

export type Role = 'user' | 'owner' | 'admin' | 'employee';

export type Branches = 'one' | 'more';

export type EmployeesCount = '2-5' | '6-9' | '10+';
