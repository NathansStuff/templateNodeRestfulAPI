import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runAssetAgeAtStartOfLoan(
    assetAgeCriteria: ICriteria,
    assetAgeAtStartOfLoan: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!assetAgeAtStartOfLoan && bestCase) return { passed: true, message: 'Asset age at start of loan skipped' };
    if (!assetAgeAtStartOfLoan)
        return { passed: false, message: 'Asset age at start of loan - no value & not best case' };

    const { min, max, type } = assetAgeCriteria;
    const errorMessage = 'Asset age at start of loan';

    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, assetAgeAtStartOfLoan, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, assetAgeAtStartOfLoan, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, assetAgeAtStartOfLoan, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid Asset age at start of loan type');
    }

    const message = passed ? 'Asset age at start of loan passed' : 'Asset age at start of loan failed';

    return { passed, message };
}
