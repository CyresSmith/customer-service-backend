export type MessageResponse = {
  message: string;
};

export interface IWorkTime {
  from: number;
  to: number;
}

export interface IWorkingHours {
  monday: IWorkTime;
  tuesday: IWorkTime;
  wednesday: IWorkTime;
  thursday: IWorkTime;
  friday: IWorkTime;
  saturday: IWorkTime;
  sunday: IWorkTime;
}

export type JobTitle = 'admin' | 'master';

export type CategoryType = 'employee' | 'service' | 'product';

export type ScheduleType = 'employee' | 'recourse';

export type ActionType = 'sale' | 'service';

export type EmployeeStatus = 'working' | 'fired';

export type Gender = 'male' | 'female' | 'other';

export type Roles = 'user' | 'owner' | 'admin' | 'employee';
