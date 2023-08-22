import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IOneEquifaxScore {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
