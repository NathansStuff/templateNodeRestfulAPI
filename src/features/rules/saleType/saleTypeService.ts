import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runSaleType(
    saleType: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'Sale type skipped' };
    if (!chosenOption) return { passed: false, message: 'Sale type failed - no value & not best case' };

    const { options } = saleType;
    if (!options) throw new BadRequestError('Invalid Sale Type options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'Sale type passed' : 'Sale type failed';

    return { passed, message };
}
