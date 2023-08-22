import { BadRequestError } from '@/exceptions/BadRequestError';

export function isInRange(
    min: number | undefined,
    max: number | undefined,
    value: number | undefined,
    errorMessage?: string
): boolean {
    if (!min || !max || !value) throw new BadRequestError(errorMessage || 'Invalid range');
    return value >= min && value <= max;
}
