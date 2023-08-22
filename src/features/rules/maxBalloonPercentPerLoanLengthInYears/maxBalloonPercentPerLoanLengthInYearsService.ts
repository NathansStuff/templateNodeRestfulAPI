import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';

export function runMaxBalloonPercentPerLoanLengthInYears(
    maxBalloonPercentPerLoanLengthInYears: ICriteria,
    balloonPercent: number | undefined,
    loanLengthInYears: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!balloonPercent && bestCase) return { passed: true, message: 'maxBalloonPercentPerLoanLengthInYears skipped' };
    if (!balloonPercent || !loanLengthInYears)
        return { passed: false, message: 'maxBalloonPercentPerLoanLengthInYears failed - no value & not best case' };

    const options = maxBalloonPercentPerLoanLengthInYears.maxRecord;

    if (!options) throw new BadRequestError('Invalid maxBalloonPercentPerLoanLengthInYears options');

    let maxMonths: number;
    if (typeof options === 'number') {
        throw new BadRequestError('Invalid maxBalloonPercentPerLoanLengthInYears options - should be object');
    } else {
        maxMonths = options[loanLengthInYears];
    }

    const passed = isBelowMax(maxMonths, balloonPercent);

    const message = passed
        ? 'maxBalloonPercentPerLoanLengthInYears passed'
        : 'maxBalloonPercentPerLoanLengthInYears failed';

    return { passed, message };
}
