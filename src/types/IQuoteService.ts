// Some fields come from the payload
// Other fields need to be calculated from the payload

import { EAssetCondition } from './enums/EAssetCondition';
import { EAssetType } from './enums/EAssetType';
import { ECreditHistory } from './enums/ECreditHistory';
import { EEmploymentStatus } from './enums/EEmploymentStatus';
import { EFinanceType } from './enums/EFinanceType';
import { ELivingStatus } from './enums/ELivingStatus';
import { EResidencyStatus } from './enums/EResidencyStatus';
import { ESaleType } from './enums/ESaleType';

// Done all at once because multiple functions need the same data
export interface IQuoteService {
    lenderCodes: string[];
    bestCase: boolean;
    equifaxScore?: number;
    saleType?: ESaleType;
    enquiriesInThreeMonths?: number;
    monthsSinceGstRegistration?: number;
    monthsSinceAbnRegistration?: number;
    financeTermInYears?: number;
    purchasePrice?: number;
    loanAmount?: number;
    monthsAtCurrentAddress?: number;
    yearsAtCurrentAddress?: number;
    monthsAtCurrentEmployer?: number;
    yearsAtCurrentEmployer?: number;
    applicantAge?: number;
    comprehensiveEquifaxScore?: number;
    oneEquifaxScore?: number;
    creditHistory?: ECreditHistory;
    residencyStatus?: EResidencyStatus;
    employmentStatus?: EEmploymentStatus;
    livingStatus?: ELivingStatus;
    assetCondition?: EAssetCondition;
    financeType?: EFinanceType;
    assetType?: EAssetType;
    balloonPercentage?: number;
    balloonAmount?: number;
    depositAmount?: number;
    depositPercentage?: number;
    assetAgeAtStartOfLoanInYears?: number;
    assetAgeAtEndOfLoanInYears?: number;
    // todo - other
}
