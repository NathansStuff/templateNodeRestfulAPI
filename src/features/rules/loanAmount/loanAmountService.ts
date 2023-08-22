import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runLoanAmount(
    loanAmount: ICriteria,
    loanValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!loanValue && bestCase) return { passed: true, message: 'loanValue skipped' };
    if (!loanValue) return { passed: false, message: 'loanValue failed - no value & not best case' };

    const errorMessage = 'Invalid loanValue range';
    const { min, max, type } = loanAmount;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, loanValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, loanValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, loanValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid loanValue type');
    }

    const message = passed ? 'loanValue passed' : 'loanValue failed';

    return { passed, message };
}
