import { BadRequestError } from '@/exceptions/BadRequestError';

export function getMonthsSinceDate(dateString: string | undefined): number | undefined {
    if (dateString === undefined) return undefined;

    const currentDate = new Date();

    const parts = dateString.split('/');
    if (parts.length !== 3) {
        return -1; // Invalid date format
    }

    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // Months in JavaScript are zero-indexed
    const year = parseInt(parts[2]);

    const inputDate = new Date(year, month, day);

    if (isNaN(inputDate.getTime())) {
        throw new BadRequestError('Invalid date');
    }

    const yearsDiff = currentDate.getFullYear() - inputDate.getFullYear();
    const monthsDiff = currentDate.getMonth() - inputDate.getMonth();

    return yearsDiff * 12 + monthsDiff;
}
