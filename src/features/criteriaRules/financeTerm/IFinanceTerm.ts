import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IFinanceTerm {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
