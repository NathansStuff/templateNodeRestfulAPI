import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runPurchasePrice(
    purchasePrice: ICriteria,
    purchaseValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!purchaseValue && bestCase) return { passed: true, message: 'purchasePrice skipped' };
    if (!purchaseValue) return { passed: false, message: 'purchasePrice failed - no value & not best case' };

    const errorMessage = 'Invalid purchasePrice range';
    const { min, max, type } = purchasePrice;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, purchaseValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, purchaseValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, purchaseValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid purchasePrice type');
    }

    const message = passed ? 'purchasePrice passed' : 'purchasePrice failed';

    return { passed, message };
}
