import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runAbnRegistrationLength(
    abnRegistionLength: ICriteria,
    monthsSinceAbnRegistion: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!monthsSinceAbnRegistion && bestCase) return { passed: true, message: 'Abn Registration Length skipped' };
    if (!monthsSinceAbnRegistion)
        return { passed: false, message: 'Abn Registration Length failed - no value & not best case' };

    const { min, max, type } = abnRegistionLength;
    const errorMessage = 'Abn Registration Length';

    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, monthsSinceAbnRegistion, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, monthsSinceAbnRegistion, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, monthsSinceAbnRegistion, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid Abn Registration Length type');
    }

    const message = passed ? 'ABN Registration Length passed' : 'ABN Registration Length failed';

    return { passed, message };
}
