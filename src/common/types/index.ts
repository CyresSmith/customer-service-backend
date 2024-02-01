import { IBasicUserInfo } from 'src/users/users.types';

export type MessageResponse = {
  message: string;
};

export interface ICreateUserResponse extends MessageResponse {
  user: IBasicUserInfo;
}

type DayId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface IDay {
  day: DayId;
  from: number;
  to: number;
}

export type IWorkingHours = IDay[];

export type JobTitle = 'admin' | 'master';

export type CategoryType = 'employee' | 'service' | 'product' | 'activity';

export type ScheduleType = 'employee' | 'recourse';

export type ActionType = 'sale' | 'service';

export type EmployeeStatus = 'working' | 'fired';

export type Gender = 'male' | 'female' | 'other';

export type Role = 'user' | 'owner' | 'admin' | 'employee';

export type Branches = 'one' | 'more';

export type EmployeesCount = '2-5' | '6-9' | '10+';
