import { BadRequestError } from '@/exceptions/BadRequestError';
import { ICriteria } from '@/types/ICriteria';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';

export function runMonthsAtCurrentEmployerByEmploymentStatus(
    monthsAtCurrentEmployerByEmploymentStatus: ICriteria,
    employmentStatus: string | undefined,
    monthsAtCurrentEmployer: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if ((!employmentStatus || !monthsAtCurrentEmployer) && bestCase)
        return { passed: true, message: 'creditHistory skipped' };
    if (!employmentStatus || !monthsAtCurrentEmployer)
        return { passed: false, message: 'creditHistory failed - no value & not best case' };

    const options = monthsAtCurrentEmployerByEmploymentStatus.max;

    if (!options) throw new BadRequestError('Invalid creditHistory options');

    let maxMonths: number;
    if (typeof options === 'number') {
        throw new BadRequestError('Invalid creditHistory options - should be object');
    } else {
        maxMonths = options[employmentStatus];
    }

    const passed = isBelowMax(maxMonths, monthsAtCurrentEmployer);

    const message = passed ? 'creditHistory passed' : 'creditHistory failed';

    return { passed, message };
}
