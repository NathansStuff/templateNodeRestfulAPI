import { model, models } from 'mongoose';

import { InfoSchema } from './infoSchema';
import { InfoWithId } from './infoType';

export const InfoModel =
    models.Info || model<InfoWithId>('InfoModel', InfoSchema);
