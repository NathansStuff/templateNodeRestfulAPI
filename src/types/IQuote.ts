import { ESaleType } from '@/features/rules/saleType/ISaleType';

export interface IQuoteBody {
    lenderCodes: string[];
    bestCase?: boolean;
    equifaxScore?: number;
    saleType?: ESaleType;
    enquiriesInThreeMonths?: number;
    gstRegistrationDate?: string;
    abnRegistrationDate?: string;
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
    creditHistory?: string;
    residencyStatus?: string;
    employmentStatus?: string;
    livingStatus?: string;
    assetCondition?: string;
    financeType?: string;
    assetType?: string;
    balloonValue?: number; // Note: Accept both but if both are present, use balloonPercentage
    balloonPercentage?: number;
    depositAmount?: number; // Note: Accept both but if both are present, use depositPercentage
    depositPercentage?: number;
    // todo - other
    buildYear?: number;
}
