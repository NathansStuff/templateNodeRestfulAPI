import { model, models } from 'mongoose';

import { PartnerSchema } from './partnerSchema';
import { Partner } from './partnerTypes';

export const PartnerModel = models.Partner || model<Partner>('Partner', PartnerSchema);
