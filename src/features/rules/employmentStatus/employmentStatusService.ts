import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runEmploymentStatus(
    employmentStatus: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'employmentStatus skipped' };
    if (!chosenOption) return { passed: false, message: 'employmentStatus failed - no value & not best case' };

    const { options } = employmentStatus;
    if (!options) throw new BadRequestError('Invalid employmentStatus options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'employmentStatus passed' : 'employmentStatus failed';

    return { passed, message };
}
