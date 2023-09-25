import { Schema } from 'mongoose';

import { LogWithId } from './logType';

export const LogSchema = new Schema<LogWithId>(
    {
        authorisation: {
            type: String,
            required: false,
        },
        requestBody: {
            type: String,
            required: false,
        },
        responseBody: {
            type: String,
            required: false,
        },
        responseStatus: {
            type: Number,
            required: false,
        },
        auditTimer: {
            type: Number,
            required: false,
        },
        endpoint: {
            type: String,
            required: false,
        },
        ipAddress: {
            type: String,
            required: false,
        },
        partnerId: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);
