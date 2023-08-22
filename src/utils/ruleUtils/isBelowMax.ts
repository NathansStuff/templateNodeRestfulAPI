import { BadRequestError } from '@/exceptions/BadRequestError';

export function isBelowMax(max: number | undefined, value: number | undefined, errorMessage?: string): boolean {
    if (!max || !value) throw new BadRequestError(errorMessage || 'Invalid range');
    return value <= max;
}
