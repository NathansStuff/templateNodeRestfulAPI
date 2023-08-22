import { ECriteriaType } from './enums/ECriteriaType';

export interface ICriteria {
    type: ECriteriaType;
    name: string;
    min?: number;
    max?: number; // Allow max to be a number or an option-based object
    options?: string[];
    maxRecord?: Record<string, number>;
}
