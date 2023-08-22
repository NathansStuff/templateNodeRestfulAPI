import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runComprehensiveEquifaxScore(
    comprehensiveEquifaxScore: ICriteria,
    comprehensiveEquifaxScoreValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!comprehensiveEquifaxScoreValue && bestCase)
        return { passed: true, message: 'comprehensiveEquifaxScore skipped' };
    if (!comprehensiveEquifaxScoreValue)
        return { passed: false, message: 'comprehensiveEquifaxScore failed - no value & not best case' };

    const errorMessage = 'Invalid comprehensiveEquifaxScore range';
    const { min, max, type } = comprehensiveEquifaxScore;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, comprehensiveEquifaxScoreValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, comprehensiveEquifaxScoreValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, comprehensiveEquifaxScoreValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid comprehensiveEquifaxScore type');
    }

    const message = passed ? 'comprehensiveEquifaxScore passed' : 'comprehensiveEquifaxScore failed';

    return { passed, message };
}
