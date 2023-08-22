import { Document } from 'mongoose';

import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ERuleOptions } from '@/types/enums/ERuleOptions';

export interface IFinanceRate {
    name: string;
    rule: {
        type: ERuleOptions;
        criteria: IFinanceRateCriteria;
    };
}

export interface IFinanceRateCriteria {
    type: ECriteriaType;
    min?: number;
    max?: number;
    value?: number;
    record?: Record<string, number>;
    options?: string[];
}

export interface IFinanceRateModel extends IFinanceRate, Document {}
