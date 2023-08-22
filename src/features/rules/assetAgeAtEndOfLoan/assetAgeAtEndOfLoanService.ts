import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runAssetAgeAtEndOfLoan(
    assetAgeCriteria: ICriteria,
    assetAgeAtEndOfLoan: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!assetAgeAtEndOfLoan && bestCase) return { passed: true, message: 'Asset age at End of loan skipped' };
    if (!assetAgeAtEndOfLoan) return { passed: false, message: 'Asset age at End of loan - no value & not best case' };

    const { min, max, type } = assetAgeCriteria;
    const errorMessage = 'Asset age at End of loan';

    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, assetAgeAtEndOfLoan, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, assetAgeAtEndOfLoan, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, assetAgeAtEndOfLoan, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid Asset age at End of loan type');
    }

    const message = passed ? 'Asset age at End of loan passed' : 'Asset age at End of loan failed';

    return { passed, message };
}
