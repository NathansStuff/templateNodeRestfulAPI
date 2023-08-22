import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runOneEquifaxScore(
    oneEquifaxScore: ICriteria,
    oneEquifaxScoreValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!oneEquifaxScoreValue && bestCase) return { passed: true, message: 'oneEquifaxScore skipped' };
    if (!oneEquifaxScoreValue) return { passed: false, message: 'oneEquifaxScore failed - no value & not best case' };

    const errorMessage = 'Invalid oneEquifaxScore range';
    const { min, max, type } = oneEquifaxScore;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, oneEquifaxScoreValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, oneEquifaxScoreValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, oneEquifaxScoreValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid oneEquifaxScore type');
    }

    const message = passed ? 'oneEquifaxScore passed' : 'oneEquifaxScore failed';

    return { passed, message };
}
