import { WithId } from 'mongodb';
import * as z from 'zod';

import { matchingEngineDefaults } from '@/constants/matchingEngineConstants';
import { EAssetCondition } from '@/features/matchingEngine/types/EAssetCondition';
import { EAssetType } from '@/features/matchingEngine/types/EAssetType';
import { ECreditHistory } from '@/features/matchingEngine/types/ECreditHistory';
import { EEmploymentStatus } from '@/features/matchingEngine/types/EEmploymentStatus';
import { EFinanceType } from '@/features/matchingEngine/types/EFinanceType';
import { ELivingStatus } from '@/features/matchingEngine/types/ELivingStatus';
import { EMatchingEngineLenders } from '@/features/matchingEngine/types/EMatchingEngineLenders';
import { ERepaymentsPeriod } from '@/features/matchingEngine/types/ERepaymentsPeriod';
import { EResidencyStatus } from '@/features/matchingEngine/types/EResidencyStatus';
import { ESellerType } from '@/features/matchingEngine/types/ESellerType';

export enum ERoles {
    ADMIN = 'ADMIN',
    PARTNER = 'PARTNER',
}

export const Partner = z.object({
    // Setup
    apiKey: z.string().nonempty(),
    networkAccess: z.array(z.string().nonempty()).default([]),
    unrestrictedNetworkAccess: z.boolean().default(false),
    actionAccess: z.array(z.string().nonempty()).default([]),
    personalReference: z.string().optional(),
    role: z.nativeEnum(ERoles).default(ERoles.PARTNER),

    // Matching Engine
    matchingEngineDefaults: z
        .object({
            allowedLenders: z
                .array(z.nativeEnum(EMatchingEngineLenders))
                .default(matchingEngineDefaults.allowedLenders),
            waterfallLenders: z
                .array(z.array(z.nativeEnum(EMatchingEngineLenders)))
                .default(matchingEngineDefaults.waterfallLenders),
            waterfallLendersOn: z.boolean().default(matchingEngineDefaults.waterfallLendersOn),
            defaultResidencyStatus: z.nativeEnum(EResidencyStatus).default(matchingEngineDefaults.residencyStatus),
            defaultEmploymentStatus: z.nativeEnum(EEmploymentStatus).default(matchingEngineDefaults.employmentStatus),
            defaultVedaEquifaxScore: z.number().default(matchingEngineDefaults.vedaEquifaxScore),
            defaultComprehensiveEquifaxScore: z.number().default(matchingEngineDefaults.comprehensiveEquifaxScore),
            defaultBrokerFee: z.number().default(matchingEngineDefaults.brokerFee),
            defaultAssetType: z.nativeEnum(EAssetType).default(matchingEngineDefaults.assetType),
            defaultFinanceType: z.nativeEnum(EFinanceType).default(matchingEngineDefaults.financeType),
            defaultLoanTerm: z.number().default(matchingEngineDefaults.loanTerm),
            defaultPurchasePrice: z.number().default(matchingEngineDefaults.purchasePrice),
            defaultDeposit: z.number().default(matchingEngineDefaults.deposit),
            defaultAssetBuildYear: z.number().default(matchingEngineDefaults.assetBuildYear),
            defaultBalloonPercentage: z.number().default(matchingEngineDefaults.balloonPercentage),
            defaultTradeInValue: z.number().default(matchingEngineDefaults.tradeInValue),
            defaultRepaymentPeriod: z.nativeEnum(ERepaymentsPeriod).default(matchingEngineDefaults.repaymentPeriod),
            defaultLivingStatus: z.nativeEnum(ELivingStatus).default(matchingEngineDefaults.livingStatus),
            defaultCreditHistory: z.nativeEnum(ECreditHistory).default(matchingEngineDefaults.creditHistory),
            defaultSellerType: z.nativeEnum(ESellerType).default(matchingEngineDefaults.sellerType),
            defaultFinanceFees: z.boolean().default(matchingEngineDefaults.financeFees),
            defaultCommissionAmount: z.number().default(matchingEngineDefaults.commissionAmount),
            defaultValuation: z.number().default(matchingEngineDefaults.valuation),
            defaultAssetCondition: z.nativeEnum(EAssetCondition).default(matchingEngineDefaults.assetCondition),
            defaultBusinessRegistrationDate: z.string().optional(),
            defaultBusinessGstRegistrationDate: z.string().optional(),
            defaultOneEquifaxScore: z.number().default(matchingEngineDefaults.oneEquifaxScore),
            defaultApplicantAge: z.number().default(matchingEngineDefaults.applicantAge),
        })
        .optional(),
});

export type Partner = z.infer<typeof Partner>;
export type PartnerWithId = WithId<Partner>;
