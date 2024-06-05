import { Cashbox } from 'db/entities';

export type ResponsibleBasicsInfo = { id: number; firstName: string; lastName: string };

export type CashboxBasicInfo = Pick<
    Cashbox,
    'id' | 'name' | 'balance' | 'isActive' | 'createdAt' | 'updatedAt'
> & {
    responsible: ResponsibleBasicsInfo;
};
