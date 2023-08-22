import { model, models } from 'mongoose';

import { IProductModel } from './IProduct';
import { ProductSchema } from './productSchema';

export const ProductModel = models.Product || model<IProductModel>('Product', ProductSchema);
