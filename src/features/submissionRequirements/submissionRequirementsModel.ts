import { model, models } from 'mongoose';

import { ISubmissionRequirements } from './ISubmissionRequirements';
import { SubmissionRequirementsSchema } from './submissionRequirementsSchema';

export const SubmissionRequirementsModel =
    models.SubmissionRequirements ||
    model<ISubmissionRequirements>('SubmissionRequirements', SubmissionRequirementsSchema);
