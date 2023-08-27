import { Document } from 'mongoose';

import { ICriteriaGroup } from '@/features/criteriaGroup/ICriteria';
import { IRatePolicy } from '@/features/ratePolicy/IRatePolicy';

export interface IProduct {
    name: string;
    criteriaGroupIds: string[];
    ratePolicyIds?: string[];
    submissionRequirementIds?: string[];
}

export interface IProductModel extends IProduct, Document {}

export interface IProductAggregate {
    name: string;
    criteriaGroups: ICriteriaGroup[];
    RatePolicys: IRatePolicy[];
}
