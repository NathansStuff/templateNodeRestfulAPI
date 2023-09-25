import { IMatchingEngineMicroserviceLender } from './IMatchingEngineMicroserviceLender';

export interface IMatchingEngineMicroserviceResponse {
    success: boolean;
    content: {
        [lenderName: string]: IMatchingEngineMicroserviceLender;
    };
}
