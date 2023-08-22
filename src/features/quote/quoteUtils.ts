import { EAssetCondition } from '@/types/enums/EAssetCondition';
import { EAssetType } from '@/types/enums/EAssetType';
import { ECreditHistory } from '@/types/enums/ECreditHistory';
import { EEmploymentStatus } from '@/types/enums/EEmploymentStatus';
import { EFinanceType } from '@/types/enums/EFinanceType';
import { ELivingStatus } from '@/types/enums/ELivingStatus';
import { EResidencyStatus } from '@/types/enums/EResidencyStatus';
import { IQuoteBody } from '@/types/IQuote';
import { IQuoteService } from '@/types/IQuoteService';
import { getMonthsSinceDate } from '@/utils/getMonthsSinceDate';

export function quoteBodyToQuoteServiceType(body: IQuoteBody): IQuoteService {
    // todo: sanitize input - check numbers, types, etc

    const lenderCodes = body.lenderCodes;
    const bestCase = body.bestCase ?? true;
    const equifaxScore = body.equifaxScore;
    const saleType = body.saleType;
    const enquiriesInThreeMonths = body.enquiriesInThreeMonths;
    const monthsSinceGstRegistration = getMonthsSinceDate(body.gstRegistrationDate);
    const monthsSinceAbnRegistration = getMonthsSinceDate(body.abnRegistrationDate);
    const financeTermInYears = body.financeTermInYears;
    const purchasePrice = body.purchasePrice;
    const loanAmount = body.loanAmount;
    const monthsAtCurrentAddress = body.monthsAtCurrentAddress;
    const yearsAtCurrentAddress = body.yearsAtCurrentAddress;
    const monthsAtCurrentEmployer = body.monthsAtCurrentEmployer;
    const yearsAtCurrentEmployer = body.yearsAtCurrentEmployer;
    const applicantAge = body.applicantAge;
    const comprehensiveEquifaxScore = body.comprehensiveEquifaxScore;
    const oneEquifaxScore = body.oneEquifaxScore;
    const creditHistory = body.creditHistory as ECreditHistory;
    const residencyStatus = body.residencyStatus as EResidencyStatus;
    const employmentStatus = body.employmentStatus as EEmploymentStatus;
    const livingStatus = body.livingStatus as ELivingStatus;
    const assetCondition = body.assetCondition as EAssetCondition;
    const financeType = body.financeType as EFinanceType;
    const assetType = body.assetType as EAssetType;
    const { amount: depositAmount, percentage: depositPercentage } = calculateAmountAndPercentage(
        loanAmount,
        body.depositPercentage,
        body.depositAmount
    );
    const { amount: balloonAmount, percentage: balloonPercentage } = calculateAmountAndPercentage(
        loanAmount,
        body.balloonPercentage,
        body.balloonValue
    );
    const { assetAgeAtStartOfLoanInYears, assetAgeAtEndOfLoanInYears } = calculateAssetAges(
        body.buildYear,
        body.financeTermInYears
    );

    return {
        lenderCodes,
        bestCase,
        equifaxScore,
        saleType,
        enquiriesInThreeMonths,
        monthsSinceGstRegistration,
        monthsSinceAbnRegistration,
        financeTermInYears,
        purchasePrice,
        loanAmount,
        monthsAtCurrentAddress,
        yearsAtCurrentAddress,
        monthsAtCurrentEmployer,
        yearsAtCurrentEmployer,
        applicantAge,
        comprehensiveEquifaxScore,
        oneEquifaxScore,
        creditHistory,
        residencyStatus,
        employmentStatus,
        livingStatus,
        assetCondition,
        financeType,
        assetType,
        balloonAmount,
        balloonPercentage,
        depositAmount,
        depositPercentage,
        assetAgeAtStartOfLoanInYears,
        assetAgeAtEndOfLoanInYears,
    };
}

function calculateAssetAges(
    buildYear: number | undefined,
    loanTerm: number | undefined
): {
    assetAgeAtStartOfLoanInYears: number | undefined;
    assetAgeAtEndOfLoanInYears: number | undefined;
} {
    if (!buildYear || !loanTerm)
        return {
            assetAgeAtStartOfLoanInYears: undefined,
            assetAgeAtEndOfLoanInYears: undefined,
        };
    const assetAgeAtStartOfLoanInYears = new Date().getFullYear() - buildYear;
    const assetAgeAtEndOfLoanInYears = assetAgeAtStartOfLoanInYears + loanTerm;
    return { assetAgeAtStartOfLoanInYears, assetAgeAtEndOfLoanInYears };
}

function calculateAmountAndPercentage(
    loanAmount: number | undefined,
    percentage: number | undefined,
    amount: number | undefined
): { amount: number | undefined; percentage: number | undefined } {
    // If no loan amount, return undefined
    if (!loanAmount) return { amount: undefined, percentage: undefined };
    // If loan amount and no percentage and no amount, return undefined
    if (!percentage && !amount) return { amount: undefined, percentage: undefined };
    // If only one of percentage or amount, calculate the other and return both
    if (percentage && !amount) return { amount: loanAmount * (percentage / 100), percentage };
    if (!percentage && amount) return { amount, percentage: (amount / loanAmount) * 100 };
    // If both, use percentage and calculate amount and return both
    if (percentage && amount) return { amount: loanAmount * (percentage / 100), percentage };

    // Should never get here
    throw new Error('calculateAmountAndPercentage - should never get here');
}
