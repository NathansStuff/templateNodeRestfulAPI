import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runCreditHistory(
    creditHistory: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'creditHistory skipped' };
    if (!chosenOption) return { passed: false, message: 'creditHistory failed - no value & not best case' };

    const { options } = creditHistory;
    if (!options) throw new BadRequestError('Invalid creditHistory options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'creditHistory passed' : 'creditHistory failed';

    return { passed, message };
}
