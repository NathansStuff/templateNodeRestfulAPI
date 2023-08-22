import { model, models } from 'mongoose';

import { CriteriaGroupSchema } from './criteriaGroupSchema';
import { ICriteriaGroupModel } from './ICriteria';

export const CriteriaGroupModel =
    models.CriteriaGroup || model<ICriteriaGroupModel>('CriteriaGroup', CriteriaGroupSchema);
