import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runMonthsAtCurrentEmployer(
    monthsAtCurrentEmployer: ICriteria,
    monthsAtCurrentEmployerValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!monthsAtCurrentEmployerValue && bestCase) return { passed: true, message: 'monthsAtCurrentEmployer skipped' };
    if (!monthsAtCurrentEmployerValue)
        return { passed: false, message: 'monthsAtCurrentEmployer failed - no value & not best case' };

    const errorMessage = 'Invalid monthsAtCurrentEmployer range';
    const { min, max, type } = monthsAtCurrentEmployer;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, monthsAtCurrentEmployerValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, monthsAtCurrentEmployerValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, monthsAtCurrentEmployerValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid monthsAtCurrentEmployer type');
    }

    const message = passed ? 'monthsAtCurrentEmployer passed' : 'monthsAtCurrentEmployer failed';

    return { passed, message };
}
