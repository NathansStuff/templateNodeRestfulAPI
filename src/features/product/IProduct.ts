import { Document } from 'mongoose';

import { ICriteriaGroup } from '@/features/criteriaGroup/ICriteria';

export interface IProduct {
    name: string;
    criteriaGroupIds: string[];
}

export interface IProductModel extends IProduct, Document {}

export interface IProductWithCriteriaGroups {
    name: string;
    criteriaGroups: ICriteriaGroup[];
}
