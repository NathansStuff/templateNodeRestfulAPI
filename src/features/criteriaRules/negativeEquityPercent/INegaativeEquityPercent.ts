import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface INegativeEquityPercent {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
