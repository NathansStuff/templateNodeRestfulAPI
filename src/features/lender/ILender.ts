import { Document } from 'mongoose';

import { IProductAggregate } from '@/features/product/IProduct';

export interface ILender {
    name: string;
    code: string;
    productIds: string[];
}

export interface ILenderModel extends ILender, Document {}

export interface ILenderAggregate {
    name: string;
    code: string;
    products: IProductAggregate[];
}
