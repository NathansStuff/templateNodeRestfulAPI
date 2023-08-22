import { model, models } from 'mongoose';

import { ILenderModel } from './ILender';
import { LenderSchema } from './lenderSchema';

export const LenderModel = models.Lender || model<ILenderModel>('Lender', LenderSchema);
