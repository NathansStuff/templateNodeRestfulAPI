/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICriteria } from '@/types/ICriteria';

export function runNegativeEquityPercentService(
    depositCriteria: ICriteria,
    loanAmount: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    return { passed: true, message: 'Negative Equity Percent not implemented - what even is this criteria?' };

    // if ((!loanAmount || !purchasePrice) && bestCase) return { passed: true, message: 'Deposit Percent skipped' };
    // if (!loanAmount || !purchasePrice)
    //     return { passed: false, message: 'Deposit Percent failed - no value & not best case' };
    // if (!loanAmount) throw new BadRequestError('Loan Amount is required');
    // if (!purchasePrice) throw new BadRequestError('Purchase Price is required');

    // const ltv = (loanAmount / purchasePrice) * 100;

    // const { min, max, type } = depositCriteria;
    // const errorMessage = 'LTV';

    // let passed = false;
    // switch (type) {
    //     case ECriteriaType.IN_RANGE:
    //         passed = isInRange(min, max, ltv, errorMessage);
    //         break;
    //     case ECriteriaType.ABOVE_MIN:
    //         passed = isAboveMin(min, ltv, errorMessage);
    //         break;
    //     case ECriteriaType.BELOW_MAX:
    //         passed = isBelowMax(max, ltv, errorMessage);
    //         break;
    //     default:
    //     case ECriteriaType.ACCEPTED_OPTIONS:
    //         throw new BadRequestError('Invalid LTV type');
    // }

    // const message = passed ? 'LTV passed' : 'LTV failed';

    // return { passed, message };
}
