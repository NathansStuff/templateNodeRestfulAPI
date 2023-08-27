import { Document } from 'mongoose';

import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ERuleOptions } from '@/types/enums/ERuleOptions';

export interface IRatePolicy {
    name: string;
    rule: {
        type: ERuleOptions;
        criteria: IRatePolicyCriteria;
    };
}

export interface IRatePolicyCriteria {
    type: ECriteriaType;
    min?: number;
    max?: number;
    value?: number;
    record?: Record<string, number>;
    options?: string[];
}

export interface IRatePolicyModel extends IRatePolicy, Document {}
