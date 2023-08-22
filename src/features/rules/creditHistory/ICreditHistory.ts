import { ECreditHistory } from '@/types/enums/ECreditHistory';
import { ECriteriaType } from '@/types/enums/ECriteriaType';

export interface ICreditHistory {
    type: ECriteriaType.ACCEPTED_OPTIONS;
    options: ECreditHistory[];
}
