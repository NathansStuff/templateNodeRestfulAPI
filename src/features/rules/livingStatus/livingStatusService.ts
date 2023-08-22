import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runLivingStatus(
    livingStatus: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'livingStatus skipped' };
    if (!chosenOption) return { passed: false, message: 'livingStatus failed - no value & not best case' };

    const { options } = livingStatus;
    if (!options) throw new BadRequestError('Invalid livingStatus options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'livingStatus passed' : 'livingStatus failed';

    return { passed, message };
}
