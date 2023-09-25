export interface IMatchingEngineRequest {
    lenderSorting?: ELenderSorting;
    waterfallLenders?: string[][];

    //matching engine params
    residencyStatus?: EQuickQuoteResidencyStatus;
    employmentStatus?: EQuickQuoteEmploymentStatus;
    vedaEquifaxScore?: number;
    comprehensiveEquifaxScore?: number;
    oneScore?: number;
    brokerFee?: number;
    assetType?: EQuickQuoteAssetType;
    financeType?: EQuickQuoteFinanceType;
    fixedTerm?: number;
    amount: number;
    glassGuideValuation?: number;
    deposit?: number;
    buildYear?: number;
    assetBalloon?: number;
    repaymentsPeriod?: EQuickQuoteRepaymentsPeriodTypes;
    ownershipType?: EQuickQuoteLivingStatusType;
    creditHistory?: EQuickQuoteCreditHistory;
    saleType?: EQuickQuoteSaleType;
    financeFees?: number;
    commissionAmount?: number;
    tradeInQuote?: number;
    applicantAge?: number;
    assetCondition?: EQuickQuoteAssetCondition;
    dateRegisteredForGST?: string; // DD/MM/YYYY
    establishedDate?: string; // DD/MM/YYYY

    // service ability params
    monthlyRepayment?: number;
    amountPaidInBankAccountMonthly: number;
    residencyExpenses?: number;
    transportAndVehicleExpenses?: number;
    otherOngoingLoansExpenses?: number;
    generalLivingExpenses?: number;
    educationExpenses?: number;
    healthcareExpenses?: number;
    numberOfDependents?: number;
    amountOfAnyOtherIncomeMonthly?: number;
    sourceOfOtherIncome?: string;
    isHouseholdExpensesShared?: boolean;
}
