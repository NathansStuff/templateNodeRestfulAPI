import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runFinanceTerm(
    financeTerm: ICriteria,
    termValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!termValue && bestCase) return { passed: true, message: 'financeTerm skipped' };
    if (!termValue) return { passed: false, message: 'financeTerm failed - no value & not best case' };

    const errorMessage = 'Invalid financeTerm range';
    const { min, max, type } = financeTerm;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, termValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, termValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, termValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid financeTerm type');
    }

    const message = passed ? 'financeTerm passed' : 'financeTerm failed';

    return { passed, message };
}
