import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface ILtv {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
