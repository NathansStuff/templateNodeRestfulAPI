import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface IAbnRegistrationLength {
    type: ECriteriaType;
    min?: number;
    max?: number;
}
