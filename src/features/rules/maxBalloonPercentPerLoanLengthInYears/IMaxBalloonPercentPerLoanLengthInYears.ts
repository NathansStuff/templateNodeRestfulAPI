import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EYears } from '@/types/EYears';

export interface IMaxBalloonPercentPerLoanPercentInYears {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    maxRecord?: Record<EYears, number>;
}
