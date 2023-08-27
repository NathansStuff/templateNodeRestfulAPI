import { IRatePolicy } from '@/features/ratePolicy/IRatePolicy';
import { ERuleOptions } from '@/types/enums/ERuleOptions';
import { IQuoteService } from '@/types/IQuoteService';

import { runFRFinanceType } from './frFinanceType/frFinanceType';

export function runFinanceRule(
    rule: IRatePolicy,
    quoteBody: IQuoteService
): {
    message: string;
    value?: number | undefined;
} {
    const ruleType = rule.rule.type;
    switch (ruleType) {
        case ERuleOptions.FINANCE_TYPE:
            return runFRFinanceType(rule, quoteBody.financeType);
        default:
            return { message: `No rule found for ruleType: ${ruleType}` };
    }
}
