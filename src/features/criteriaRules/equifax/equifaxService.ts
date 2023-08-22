import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runEquifax(
    equifax: ICriteria,
    equifaxValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!equifaxValue && bestCase) return { passed: true, message: 'Equifax skipped' };
    if (!equifaxValue) return { passed: false, message: 'Equifax failed - no value & not best case' };
    const { min, max, type } = equifax;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, equifaxValue, 'Invalid Equifax range');
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, equifaxValue, 'Invalid Equifax range');
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, equifaxValue, 'Invalid Equifax range');
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid Equifax type');
    }

    const message = passed ? 'Equifax passed' : 'Equifax failed';

    return { passed, message };
}
