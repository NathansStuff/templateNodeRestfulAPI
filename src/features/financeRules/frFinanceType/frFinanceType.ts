import { BadRequestError } from '@/exceptions/BadRequestError';
import { IFinanceRate } from '@/features/financeRate/IFinanceRate';
import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EFinanceType } from '@/types/enums/EFinanceType';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runFRFinanceType(
    criteria: IFinanceRate,
    financeType: EFinanceType | undefined
): {
    message: string;
    value?: number;
} {
    if (!financeType) return { message: 'No finance type found' };

    const { type, options, value } = criteria.rule.criteria;
    if (!value) return { message: 'No value found' };

    const matchedMessage = `Finance type matched, value: ${value}`;
    if (!options) throw new BadRequestError('Invalid financeType criteria options');

    if (type !== ECriteriaType.ACCEPTED_OPTIONS) {
        throw new BadRequestError('Invalid financeType criteria type');
    }

    const acceptedOption = isAcceptedOption(options, financeType);
    if (!acceptedOption) return { message: 'No accepted option found' };
    return { message: matchedMessage, value };
}
