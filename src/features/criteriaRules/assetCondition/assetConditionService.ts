import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runAssetCondition(
    assetCondition: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'assetCondition skipped' };
    if (!chosenOption) return { passed: false, message: 'assetCondition failed - no value & not best case' };

    const { options } = assetCondition;
    if (!options) throw new BadRequestError('Invalid assetCondition options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'assetCondition passed' : 'assetCondition failed';

    return { passed, message };
}
