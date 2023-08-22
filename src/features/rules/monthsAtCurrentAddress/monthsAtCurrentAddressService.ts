import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runMonthsAtCurrentAddress(
    monthsAtCurrentAddress: ICriteria,
    monthsAtCurrentAddressValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!monthsAtCurrentAddressValue && bestCase) return { passed: true, message: 'monthsAtCurrentAddress skipped' };
    if (!monthsAtCurrentAddressValue)
        return { passed: false, message: 'monthsAtCurrentAddress failed - no value & not best case' };

    const errorMessage = 'Invalid monthsAtCurrentAddress range';
    const { min, max, type } = monthsAtCurrentAddress;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, monthsAtCurrentAddressValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, monthsAtCurrentAddressValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, monthsAtCurrentAddressValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid monthsAtCurrentAddress type');
    }

    const message = passed ? 'monthsAtCurrentAddress passed' : 'monthsAtCurrentAddress failed';

    return { passed, message };
}
