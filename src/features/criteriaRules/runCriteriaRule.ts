import { ERuleOptions } from '@/types/enums/ERuleOptions';
import { IQuoteService } from '@/types/IQuoteService';
import { IRule } from '@/types/IRule';

import { runAbnRegistrationLength } from './abnRegistrationLength/abnRegistrationLengthService';
import { runApplicantAge } from './applicantAge/applicantAgeService';
import { runAssetAgeAtEndOfLoan } from './assetAgeAtEndOfLoan/assetAgeAtEndOfLoanService';
import { runAssetAgeAtStartOfLoan } from './assetAgeAtStartOfLoan/assetAgeAtStartOfLoanService';
import { runAssetCondition } from './assetCondition/assetConditionService';
import { runAssetType } from './assetType/assetTypeService';
import { runComprehensiveEquifaxScore } from './comprehensiveEquifaxScore/comprehensiveEquifaxScoreService';
import { runCreditHistory } from './creditHistory/creditHistoryService';
import { runDepositPercent } from './depositPercent/depositPercentService';
import { runEmploymentStatus } from './employmentStatus/employmentStatusService';
import { runEquifax } from './equifax/equifaxService';
import { runFinanceTerm } from './financeTerm/financeTerm';
import { runFinanceType } from './financeType/financeTypeService';
import { runGstRegistrationLength } from './gstRegistrationLength/gstRegistrationLengthService';
import { runLivingStatus } from './livingStatus/livingStatusService';
import { runLoanAmount } from './loanAmount/loanAmountService';
import { runLtv } from './ltv/ltvService';
import { runMaxBalloonPercentPerLoanLengthInYears } from './maxBalloonPercentPerLoanLengthInYears/maxBalloonPercentPerLoanLengthInYearsService';
import { runMaxEnquiriesInThreeMonths } from './maxEnquiriesInThreeMonths/maxEnquiriesInThreeMonthsService';
import { runMonthsAtCurrentAddress } from './monthsAtCurrentAddress/monthsAtCurrentAddressService';
import { runMonthsAtCurrentEmployer } from './monthsAtCurrentEmployer/monthsAtCurrentEmployerService';
import { runMonthsAtCurrentEmployerByEmploymentStatus } from './monthsAtCurrentEmployerByEmploymentStatus/monthsAtCurrentEmployerByEmploymentStatusService';
import { runNegativeEquityPercentService } from './negativeEquityPercent/negativeEquityPercentService';
import { runOneEquifaxScore } from './oneEquifaxScore/oneEquifaxScoreService';
import { runPurchasePrice } from './purchasePrice/purchasePriceService';
import { runResidencyStatus } from './residencyStatus/residencyStatusService';
import { runSaleType } from './saleType/saleTypeService';

export function runCriteriaRule(rule: IRule, quoteBody: IQuoteService): { passed: boolean; message: string } {
    const { bestCase } = quoteBody;
    switch (rule.type) {
        // ***** Rules with a 1:1 to payload *****
        case ERuleOptions.EQUIFAX:
            return runEquifax(rule.criteria, quoteBody.equifaxScore, bestCase);
        case ERuleOptions.SALE_TYPE:
            return runSaleType(rule.criteria, quoteBody.saleType, bestCase);
        case ERuleOptions.MAX_ENQUIRIES_IN_THREE_MONTHS:
            return runMaxEnquiriesInThreeMonths(rule.criteria, quoteBody.enquiriesInThreeMonths, quoteBody.bestCase);
        case ERuleOptions.GST_REGISTRATION_LENGTH:
            return runGstRegistrationLength(rule.criteria, quoteBody.monthsSinceGstRegistration, quoteBody.bestCase);
        case ERuleOptions.ABN_REGISTRATION_LENGTH:
            return runAbnRegistrationLength(rule.criteria, quoteBody.monthsSinceAbnRegistration, quoteBody.bestCase);
        case ERuleOptions.APPLICANT_AGE:
            return runApplicantAge(rule.criteria, quoteBody.applicantAge, quoteBody.bestCase);
        case ERuleOptions.COMPREHENSIVE_EQUIFAX_SCORE:
            return runComprehensiveEquifaxScore(rule.criteria, quoteBody.comprehensiveEquifaxScore, quoteBody.bestCase);
        case ERuleOptions.ONE_EQUIFAX_SCORE:
            return runOneEquifaxScore(rule.criteria, quoteBody.oneEquifaxScore, quoteBody.bestCase);
        case ERuleOptions.FINANCE_TERM_IN_YEARS:
            return runFinanceTerm(rule.criteria, quoteBody.financeTermInYears, quoteBody.bestCase);
        case ERuleOptions.PURCHASE_PRICE:
            return runPurchasePrice(rule.criteria, quoteBody.purchasePrice, quoteBody.bestCase);
        case ERuleOptions.LOAN_AMOUNT:
            return runLoanAmount(rule.criteria, quoteBody.loanAmount, quoteBody.bestCase);
        case ERuleOptions.MONTHS_AT_CURRENT_ADDRESS:
            return runMonthsAtCurrentAddress(rule.criteria, quoteBody.monthsAtCurrentAddress, quoteBody.bestCase);
        case ERuleOptions.MONTHS_AT_CURRENT_EMPLOYER:
            return runMonthsAtCurrentEmployer(rule.criteria, quoteBody.monthsAtCurrentEmployer, quoteBody.bestCase);
        case ERuleOptions.CREDIT_HISTORY:
            return runCreditHistory(rule.criteria, quoteBody.creditHistory, quoteBody.bestCase);
        case ERuleOptions.RESIDENCY_STATUS:
            return runResidencyStatus(rule.criteria, quoteBody.residencyStatus, quoteBody.bestCase);
        case ERuleOptions.EMPLOYMENT_STATUS:
            return runEmploymentStatus(rule.criteria, quoteBody.employmentStatus, quoteBody.bestCase);
        case ERuleOptions.LIVING_STATUS:
            return runLivingStatus(rule.criteria, quoteBody.livingStatus, quoteBody.bestCase);
        case ERuleOptions.ASSET_CONDITION:
            return runAssetCondition(rule.criteria, quoteBody.assetCondition, quoteBody.bestCase);
        case ERuleOptions.FINANCE_TYPE:
            return runFinanceType(rule.criteria, quoteBody.financeType, quoteBody.bestCase);
        case ERuleOptions.ASSET_TYPE:
            return runAssetType(rule.criteria, quoteBody.assetType, quoteBody.bestCase);
        // ***** End Rules with a 1:1 to payload *****
        case ERuleOptions.DEPOSIT_PERCENT:
            return runDepositPercent(rule.criteria, quoteBody.purchasePrice, quoteBody.loanAmount, quoteBody.bestCase);
        case ERuleOptions.ASSET_AGE_AT_END_OF_LOAN:
            return runAssetAgeAtEndOfLoan(rule.criteria, quoteBody.assetAgeAtEndOfLoanInYears, quoteBody.bestCase);
        case ERuleOptions.ASSET_AGE_AT_START_OF_LOAN:
            return runAssetAgeAtStartOfLoan(rule.criteria, quoteBody.assetAgeAtStartOfLoanInYears, quoteBody.bestCase);
        case ERuleOptions.LTV:
            return runLtv(rule.criteria, quoteBody.loanAmount, quoteBody.purchasePrice, quoteBody.bestCase);
        case ERuleOptions.NEGATIVE_EQUITY_PERCENT:
            return runNegativeEquityPercentService(rule.criteria, quoteBody.loanAmount, quoteBody.bestCase);
        // ***** Rules where things get a bit more complicated *****
        case ERuleOptions.MAX_BALLOON_PERCENT_PER_LOAN_LENGTH_IN_YEARS:
            return runMaxBalloonPercentPerLoanLengthInYears(
                rule.criteria,
                quoteBody.balloonPercentage,
                quoteBody.financeTermInYears,
                quoteBody.bestCase
            );
        case ERuleOptions.MONTHS_AT_CURRENT_EMPLOYER_BY_EMPLOYMENT_STATUS:
            return runMonthsAtCurrentEmployerByEmploymentStatus(
                rule.criteria,
                quoteBody.employmentStatus,
                quoteBody.monthsAtCurrentEmployer,
                quoteBody.bestCase
            );

        // ***** End Rules where things get a bit more complicated *****
        default:
            return { passed: false, message: 'Rule not found' };
    }
}
