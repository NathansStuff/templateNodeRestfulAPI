import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runResidencyStatus(
    residencyStatus: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'residencyStatus skipped' };
    if (!chosenOption) return { passed: false, message: 'residencyStatus failed - no value & not best case' };

    const { options } = residencyStatus;
    if (!options) throw new BadRequestError('Invalid residencyStatus options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'residencyStatus passed' : 'residencyStatus failed';

    return { passed, message };
}
