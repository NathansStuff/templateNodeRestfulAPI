import { ICriteria } from '@/types/ICriteria';
import { isBelowMax } from '@/utils/ruleUtils/isBelowMax';

export function runMaxEnquiriesInThreeMonths(
    maxEnquiriesInThreeMonths: ICriteria,
    enquiriesInThreeMonths: number | undefined,
    bestCase: boolean | undefined
): { passed: boolean; message: string } {
    if (!enquiriesInThreeMonths && bestCase) return { passed: true, message: 'Max enquiries in three months skipped' };
    if (!enquiriesInThreeMonths)
        return { passed: false, message: 'Max enquiries in three months failed - no value & not best case' };

    const passed = isBelowMax(
        maxEnquiriesInThreeMonths.max,
        enquiriesInThreeMonths,
        'Invalid Max enquiries in three months range'
    );
    const message = passed ? 'Max enquiries in three months passed' : 'Max enquiries in three months failed';
    return { passed, message };
}
