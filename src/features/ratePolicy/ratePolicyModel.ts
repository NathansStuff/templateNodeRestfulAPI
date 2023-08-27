import { model, models } from 'mongoose';

import { IRatePolicyModel } from './IRatePolicy';
import { RatePolicySchema } from './ratePolicySchema';

export const RatePolicyModel = models.RatePolicy || model<IRatePolicyModel>('RatePolicy', RatePolicySchema);
