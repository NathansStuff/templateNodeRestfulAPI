import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IComprehensiveEquifaxScore {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
