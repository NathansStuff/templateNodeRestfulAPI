import { Schema } from 'mongoose';

import { EDocument } from '@/types/enums/EDocument';

import { ISubmissionRequirements } from './ISubmissionRequirements';

export const SubmissionRequirementsSchema = new Schema<ISubmissionRequirements>(
    {
        applicationDocuments: {
            type: [String],
            enum: Object.values(EDocument),
        },
        settlementDocuments: {
            type: [String],
            enum: Object.values(EDocument),
        },
    },
    {
        timestamps: true,
    }
);
