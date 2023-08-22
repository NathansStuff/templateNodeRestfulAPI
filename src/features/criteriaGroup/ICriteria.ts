import { Document } from 'mongoose';

import { IRule } from '@/types/IRule';

export interface ICriteriaGroup {
    name: string;
    rules: IRule[];
}

export interface ICriteriaGroupModel extends ICriteriaGroup, Document {}
