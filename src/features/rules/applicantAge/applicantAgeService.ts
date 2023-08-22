import { BadRequestError } from '@/exceptions/BadRequestError';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { ICriteria } from '@/types/ICriteria';
import { isAboveMin } from '@/utils/ruleUtils/isAboveMin';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';
import { isInRange } from '@/utils/ruleUtils/isInRange';

export function runApplicantAge(
    applicantAge: ICriteria,
    applicantAgeValue: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!applicantAgeValue && bestCase) return { passed: true, message: 'applicantAge skipped' };
    if (!applicantAgeValue) return { passed: false, message: 'applicantAge failed - no value & not best case' };

    const errorMessage = 'Invalid applicantAge range';
    const { min, max, type } = applicantAge;
    let passed = false;
    switch (type) {
        case ECriteriaType.IN_RANGE:
            passed = isInRange(min, max, applicantAgeValue, errorMessage);
            break;
        case ECriteriaType.ABOVE_MIN:
            passed = isAboveMin(min, applicantAgeValue, errorMessage);
            break;
        case ECriteriaType.BELOW_MAX:
            passed = isBelowMax(max, applicantAgeValue, errorMessage);
            break;
        default:
        case ECriteriaType.ACCEPTED_OPTIONS:
            throw new BadRequestError('Invalid applicantAge type');
    }

    const message = passed ? 'applicantAge passed' : 'applicantAge failed';

    return { passed, message };
}
