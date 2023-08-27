import { Document } from 'mongoose';

import { EDocument } from '@/types/enums/EDocument';

export interface ISubmissionRequirements {
    name: string;
    applicationDocuments: EDocument[];
    settlementDocuments: EDocument[];
}

export interface ISubmissionRequirementsModel extends ISubmissionRequirements, Document {}
