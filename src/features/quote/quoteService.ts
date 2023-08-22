import { getCriteriaGroupsByIds } from '@/features/criteriaGroup/criteriaGroupService';
import { ICriteriaGroup } from '@/features/criteriaGroup/ICriteria';
import { ILenderWithCriteriaGroups } from '@/features/lender/ILender';
import { getLenderByCode } from '@/features/lender/lenderService';
import { runAbnRegistrationLength } from '@/features/rules/abnRegistrationLength/abnRegistrationLengthService';
import { runApplicantAge } from '@/features/rules/applicantAge/applicantAgeService';
import { runAssetAgeAtEndOfLoan } from '@/features/rules/assetAgeAtEndOfLoan/assetAgeAtEndOfLoanService';
import { runAssetAgeAtStartOfLoan } from '@/features/rules/assetAgeAtStartOfLoan/assetAgeAtStartOfLoanService';
import { runAssetCondition } from '@/features/rules/assetCondition/assetConditionService';
import { runAssetType } from '@/features/rules/assetType/assetTypeService';
import { runComprehensiveEquifaxScore } from '@/features/rules/comprehensiveEquifaxScore/comprehensiveEquifaxScoreService';
import { runCreditHistory } from '@/features/rules/creditHistory/creditHistoryService';
import { runDepositPercent } from '@/features/rules/depositPercent/depositPercentService';
import { runEmploymentStatus } from '@/features/rules/employmentStatus/employmentStatusService';
import { runEquifax } from '@/features/rules/equifax/equifaxService';
import { runFinanceTerm } from '@/features/rules/financeTerm/financeTerm';
import { runFinanceType } from '@/features/rules/financeType/financeTypeService';
import { runGstRegistrationLength } from '@/features/rules/gstRegistrationLength/gstRegistrationLengthService';
import { runLivingStatus } from '@/features/rules/livingStatus/livingStatusService';
import { runLoanAmount } from '@/features/rules/loanAmount/loanAmountService';
import { runLtv } from '@/features/rules/ltv/ltvService';
import { runMaxBalloonPercentPerLoanLengthInYears } from '@/features/rules/maxBalloonPercentPerLoanLengthInYears/maxBalloonPercentPerLoanLengthInYearsService';
import { runMaxEnquiriesInThreeMonths } from '@/features/rules/maxEnquiriesInThreeMonths/maxEnquiriesInThreeMonthsService';
import { runMonthsAtCurrentAddress } from '@/features/rules/monthsAtCurrentAddress/monthsAtCurrentAddressService';
import { runMonthsAtCurrentEmployer } from '@/features/rules/monthsAtCurrentEmployer/monthsAtCurrentEmployerService';
import { runMonthsAtCurrentEmployerByEmploymentStatus } from '@/features/rules/monthsAtCurrentEmployerByEmploymentStatus/monthsAtCurrentEmployerByEmploymentStatusService';
import { runNegativeEquityPercentService } from '@/features/rules/negativeEquityPercent/negativeEquityPercentService';
import { runOneEquifaxScore } from '@/features/rules/oneEquifaxScore/oneEquifaxScoreService';
import { runPurchasePrice } from '@/features/rules/purchasePrice/purchasePriceService';
import { runResidencyStatus } from '@/features/rules/residencyStatus/residencyStatusService';
import { runSaleType } from '@/features/rules/saleType/saleTypeService';
import { ERuleOptions } from '@/types/enums/ERuleOptions';
import { IQuoteBody } from '@/types/IQuote';
import { IQuoteService } from '@/types/IQuoteService';
import { IRule } from '@/types/IRule';

import { quoteBodyToQuoteServiceType } from './quoteUtils';

export async function getQuote(
    quoteBody: IQuoteBody
): Promise<{ lenderCode: string; lenderResult: boolean; message: string[] }[]> {
    const serviceType = quoteBodyToQuoteServiceType(quoteBody);
    const lenders: ILenderWithCriteriaGroups[] = await getQuoteLenders(serviceType.lenderCodes);
    const lenderResults = runLenders(lenders, serviceType);

    return lenderResults;
}

// ***** Internal Helpers *****

function runLenders(
    lenders: ILenderWithCriteriaGroups[],
    quoteBody: IQuoteService
): { lenderCode: string; lenderResult: boolean; message: string[] }[] {
    const lenderResults: { lenderCode: string; lenderResult: boolean; message: string[] }[] = [];
    lenders.forEach((lender) => {
        const { passed, message } = runLender(lender, quoteBody);
        lenderResults.push({ lenderCode: lender.code, lenderResult: passed, message });
    });

    return lenderResults;
}

function runLender(
    lender: ILenderWithCriteriaGroups,
    quoteBody: IQuoteService
): {
    passed: boolean;
    message: string[];
} {
    let lenderPassed = true;
    let lenderMessage: string[] = [];
    lender.criteriaGroups.forEach((criteriaGroup) => {
        const { passed, message } = runCriteriaGroups(criteriaGroup, quoteBody);
        lenderPassed = lenderPassed && passed;
        lenderMessage = lenderMessage.concat(message);
    });

    return {
        passed: lenderPassed,
        message: lenderMessage,
    };
}

async function getQuoteLenders(lenderCodes: string[]): Promise<ILenderWithCriteriaGroups[]> {
    const lenders: ILenderWithCriteriaGroups[] = [];
    for (const lenderName of lenderCodes) {
        const lender = await getLenderByCode(lenderName);
        if (!lender) continue;
        const criteriaGroups = await getCriteriaGroupsByIds(lender.criteriaGroupIds);
        const returnObject: ILenderWithCriteriaGroups = {
            name: lender.name,
            code: lender.code,
            criteriaGroups,
        };

        lenders.push(returnObject);
    }

    return lenders;
}

function runCriteriaGroups(criteria: ICriteriaGroup, quoteBody: IQuoteService): { passed: boolean; message: string[] } {
    const criteriaGroupMessage: string[] = [`running criteria group: ${criteria.name}`];
    let criteriaPassed = true;
    if (criteria.rules.length === 0) {
        return { passed: false, message: ['No rules found'] };
    }

    criteria.rules.forEach((rule) => {
        const { passed, message } = runRule(rule, quoteBody);
        criteriaPassed = criteriaPassed && passed;
        criteriaGroupMessage.push(message);
    });

    return { passed: criteriaPassed, message: criteriaGroupMessage };
}

function runRule(rule: IRule, quoteBody: IQuoteService): { passed: boolean; message: string } {
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
