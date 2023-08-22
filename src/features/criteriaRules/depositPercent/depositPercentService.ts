import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runDepositPercent(
    depositCriteria: ICriteria,
    loanAmount: number | undefined,
    deposit: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!deposit && bestCase) return { passed: true, message: 'Deposit Percent skipped' };
    if (!deposit) return { passed: false, message: 'Deposit Percent failed - no value & not best case' };
    if (!loanAmount) throw new BadRequestError('Loan Amount is required');

    const percent = deposit / loanAmount;

    const { min, max, type } = depositCriteria;
    const errorMessage = 'Deposit Percent Length';

    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, percent, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, percent, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, percent, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid Deposit Percent type');
    }

    const message = passed ? 'Deposit Percent passed' : 'Deposit Percent failed';

    return { passed, message };
}
