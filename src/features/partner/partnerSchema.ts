import { Schema } from 'mongoose';

import { Partner } from './partnerTypes';

export const PartnerSchema = new Schema<Partner>(
    {
        // Setup
        apiKey: { type: String, required: true, unique: true },
        networkAccess: { type: [String], required: true },
        unrestrictedNetworkAccess: { type: Boolean, required: true },
        actionAccess: { type: [String], required: true },
        personalReference: { type: String, required: true },
        role: { type: String, required: true },

        // Matching Engine
        matchingEngineDefaults: {
            type: {
                allowedLenders: { type: [String], required: true },
                waterfallLenders: { type: [[String]], required: true },
                waterfallLendersOn: { type: Boolean, required: true },
                defaultResidencyStatus: { type: String, required: true },
                defaultEmploymentStatus: { type: String, required: true },
                defaultVedaEquifaxScore: { type: Number, required: true },
                defaultComprehensiveEquifaxScore: { type: Number, required: true },
                defaultBrokerFee: { type: Number, required: true },
                defaultAssetType: { type: String, required: true },
                defaultFinanceType: { type: String, required: true },
                defaultLoanTerm: { type: Number, required: true },
                defaultPurchasePrice: { type: Number, required: true },
                defaultSaleType: { type: String, required: true },
                defaultAssetCondition: { type: String, required: true },
                defaultAssetAge: { type: String, required: true },
                defaultAssetMileage: { type: String, required: true },
                defaultAssetRepaymentsPeriod: { type: String, required: true },
                defaultAssetLivingStatus: { type: String, required: true },
                defaultCreditHistory: { type: String, required: true },
                defaultAssetMake: { type: String, required: true },
                defaultAssetModel: { type: String, required: true },
            },
            required: false,
        },
    },
    {
        timestamps: true,
    }
);
