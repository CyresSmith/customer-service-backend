import { Resource } from 'db/entities';
import { IBasicServiceCategoryInfo } from 'src/categories/categories.types';
import { IBasicEmployeeInfo } from 'src/employees/employees.types';
import { IBasicUserInfo } from 'src/users/users.types';

export type MessageResponse = {
    message: string;
};

export interface IMessageResponseWithData<T> extends MessageResponse {
    data: T;
}

export interface ICreateUserResponse extends MessageResponse {
    user: IBasicUserInfo;
}

export interface ISchedule {
    from: string;
    to: string;
}

export interface IWorkSchedule {
    hours: ISchedule;
    days: number[];
    breakHours?: ISchedule;
}

export interface IScheduleDay {
    hours: ISchedule;
    breakHours?: ISchedule;
    day: number;
}

export type MonthSchedule = IScheduleDay[];

export interface ICreateSchedule {
    companyId: number;
    year: number;
    month: number;
    schedule: MonthSchedule;
}

export interface ICreateEmployeeSchedule extends ICreateSchedule {
    employeeId: number;
}

export interface IUpdateEmployeeSchedule extends ICreateEmployeeSchedule {
    id: number;
}

export type IWorkingHours = IWorkSchedule[];

export type JobTitle = 'admin' | 'master';

export type CategoryType = 'employee' | 'service' | 'product' | 'activity';

export type ScheduleType = 'employee' | 'recourse';

export type ActionType = 'sale' | 'service';

export type EmployeeStatus = 'working' | 'fired';

export type Gender = 'male' | 'female' | 'other' | '';

export type Role = 'user' | 'owner' | 'admin' | 'employee';

export type Branches = 'one' | 'more';

export type EmployeesCount = '2-5' | '6-9' | '10+';

export type ServiceType = 'individual' | 'group';

export type EmployeesServiceSettings = {
    employeeId: number;
    price?: number;
    duration?: number;
};

export type ServiceDataType = {
    id: number;
    name: string;
    avatar: string | null;
    duration: number;
    break: number | null;
    price: number;
    desc: string | null;
    employeesSettings: EmployeesServiceSettings[];
    images: string[];
    category: IBasicServiceCategoryInfo;
    employees: IBasicEmployeeInfo[];
    resources?: Resource[];
    type: ServiceType;
    capacity: number;
    placeLimit: number;
};

export type IBasicServiceInfo = Pick<
    ServiceDataType,
    'id' | 'name' | 'avatar' | 'duration' | 'price' | 'type' | 'category' | 'employeesSettings'
>;

export type EventTime = {
    from: string;
    to: string;
};

export type EventDataType = {
    id: number;
    year: number;
    month: number;
    day: number;
    time: EventTime;
    duration: number;
    comments: string | null;
    employee: { id: number };
    client: { id: number };
    services: { id: number }[];
};
