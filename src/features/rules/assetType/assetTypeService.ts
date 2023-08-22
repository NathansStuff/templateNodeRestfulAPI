import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isAcceptedOption } from '@/utils/ruleUtils/isAcceptedOption';

export function runAssetType(
    assetType: ICriteria,
    chosenOption: string | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!chosenOption && bestCase) return { passed: true, message: 'assetType skipped' };
    if (!chosenOption) return { passed: false, message: 'assetType failed - no value & not best case' };

    const { options } = assetType;
    if (!options) throw new BadRequestError('Invalid assetType options');
    const passed = isAcceptedOption(options, chosenOption);

    const message = passed ? 'assetType passed' : 'assetType failed';

    return { passed, message };
}
