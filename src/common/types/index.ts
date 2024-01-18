export type MessageResponse = {
  message: string;
};

export interface IWorkTime {
  from: number;
  to: string;
}

export interface IWorkingHours {
  Monday: IWorkTime;
  Tuesday: IWorkTime;
  Wednesday: IWorkTime;
  Thursday: IWorkTime;
  Friday: IWorkTime;
  Saturday: IWorkTime;
  Sunday: IWorkTime;
}

export type JobTitle = 'admin' | 'master';

export type CategoryType = 'employee' | 'service' | 'product';

export type ScheduleType = 'employee' | 'recourse';

export type ActionType = 'sale' | 'service';

export type EmployeeStatus = 'working' | 'fired';

export type Gender = 'male' | 'female' | 'other';
