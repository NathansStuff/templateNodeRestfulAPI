import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runFinanceType(
    financeType: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'financeType skipped' };
    if (!chosenOption) return { passed: false, message: 'financeType failed - no value & not best case' };

    const { options } = financeType;
    if (!options) throw new BadRequestError('Invalid financeType options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'financeType passed' : 'financeType failed';

    return { passed, message };
}
