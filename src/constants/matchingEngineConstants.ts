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

const _CREDIT_SCORE = 750;

export const matchingEngineDefaults = {
    allowedLenders: [EMatchingEngineLenders.ALL],
    waterfallLenders: [[EMatchingEngineLenders.ALL]],
    waterfallLendersOn: false,
    residencyStatus: EResidencyStatus.AUSTRALIAN_CITIZEN,
    employmentStatus: EEmploymentStatus.PERMANENT,
    vedaEquifaxScore: _CREDIT_SCORE,
    comprehensiveEquifaxScore: _CREDIT_SCORE,
    brokerFee: 990,
    assetType: EAssetType.MOTOR_VEHICLES_SEC,
    financeType: EFinanceType.CONSUMER,
    loanTerm: 5,
    purchasePrice: 50000,
    assetBuildYear: 2023,
    balloonPercentage: 0,
    tradeInValue: 0,
    repaymentPeriod: ERepaymentsPeriod.MONTHLY,
    livingStatus: ELivingStatus.OWNER,
    creditHistory: ECreditHistory.CLEAR_CREDIT,
    sellerType: ESellerType.DEALERSHIP,
    financeFees: true,
    commissionAmount: 990,
    valuation: 50000,
    assetCondition: EAssetCondition.NEW,
    oneEquifaxScore: _CREDIT_SCORE,
    applicantAge: 40,
    deposit: 0,
};
