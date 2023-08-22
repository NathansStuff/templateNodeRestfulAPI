import { Document } from 'mongoose';

import { ICriteriaGroup } from '@/features/criteriaGroup/ICriteria';
import { IFinanceRate } from '@/features/financeRate/IFinanceRate';

export interface IProduct {
    name: string;
    criteriaGroupIds: string[];
    financeRateIds?: string[];
}

export interface IProductModel extends IProduct, Document {}

export interface IProductAggregate {
    name: string;
    criteriaGroups: ICriteriaGroup[];
    financeRates: IFinanceRate[];
}
