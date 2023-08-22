import { model, models } from 'mongoose';

import { FinanceRateSchema } from './financeRateSchema';
import { IFinanceRateModel } from './IFinanceRate';

export const FinanceRateModel = models.FinanceRate || model<IFinanceRateModel>('FinanceRate', FinanceRateSchema);
