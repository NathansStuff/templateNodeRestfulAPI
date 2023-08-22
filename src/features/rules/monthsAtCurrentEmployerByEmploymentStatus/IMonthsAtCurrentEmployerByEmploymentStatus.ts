import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EEmploymentStatus } from '@/types/enums/EEmploymentStatus';

export interface IMonthsAtCurrentEmployerByEmploymentStatus {
    type: ECriteriaType.OPTION_DEPENDENT_MAX;
    maxRecord?: Record<EEmploymentStatus, number>;
}
