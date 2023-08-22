import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IEquifax {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
