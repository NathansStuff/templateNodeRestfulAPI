import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IPurchasePrice {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
