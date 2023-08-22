import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runGstRegistrationLength(
    gstRegistionLength: ICriteria,
    monthsSinceGstRegistration: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!monthsSinceGstRegistration && bestCase) return { passed: true, message: 'GST Registration Length skipped' };
    if (!monthsSinceGstRegistration)
        return { passed: false, message: 'GST Registration Length failed - no value & not best case' };

    const { min, max, type } = gstRegistionLength;
    const errorMessage = 'GST Registration Length';

    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, monthsSinceGstRegistration, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, monthsSinceGstRegistration, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, monthsSinceGstRegistration, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid GST Registration Length type');
    }

    const message = passed ? 'GST Registration Length passed' : 'GST Registration Length failed';

    return { passed, message };
}
