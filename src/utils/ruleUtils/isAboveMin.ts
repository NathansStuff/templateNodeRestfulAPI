import { BadRequestError } from '@/exceptions/BadRequestError';

export function isAboveMin(min: number | undefined, value: number | undefined, errorMessage?: string): boolean {
    if (!min || !value) throw new BadRequestError(errorMessage || 'Invalid range');
    return value >= min;
}
