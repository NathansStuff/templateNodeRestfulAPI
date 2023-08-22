import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EYears } from '@/types/enums/EYears';

export interface IMaxBalloonPercentPerLoanPercentInYears {
    type: ECriteriaType.OPTION_DEPENDENT_MAX;
    maxRecord?: Record<EYears, number>;
}
