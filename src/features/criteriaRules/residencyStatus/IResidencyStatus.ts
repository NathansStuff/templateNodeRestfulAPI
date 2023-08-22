import { ECriteriaType } from '@/types/enums/ECriteriaType';
import { EResidencyStatus } from '@/types/enums/EResidencyStatus';

export interface IResidencyStatus {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: EResidencyStatus[];
}
