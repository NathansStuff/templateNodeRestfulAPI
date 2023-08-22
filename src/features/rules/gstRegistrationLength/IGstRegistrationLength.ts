import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IGstRegistrationLength {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
