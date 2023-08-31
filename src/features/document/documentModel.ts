import { model, models } from 'mongoose';

import { DocumentSchema } from './documentSchema';
import { DocumentWithId } from './documentType';

export const DocumentModel = models.Document || model<DocumentWithId>('DocumentModel', DocumentSchema);
