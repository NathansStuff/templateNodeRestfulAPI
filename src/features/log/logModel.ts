import { model, models } from 'mongoose';

import { LogSchema } from './logSchema';
import { LogWithId } from './logType';

export const LogModel = models.Log || model<LogWithId>('Logs', LogSchema);
