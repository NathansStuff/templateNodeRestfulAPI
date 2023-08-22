import { Document } from 'mongoose';

import { ICriteriaGroup } from '@/features/criteriaGroup/ICriteria';

export interface ILender {
    name: string;
    code: string;
    criteriaGroupIds: string[];
}

export interface ILenderModel extends ILender, Document {}

export interface ILenderWithCriteriaGroups {
    name: string;
    code: string;
    criteriaGroups: ICriteriaGroup[];
}
