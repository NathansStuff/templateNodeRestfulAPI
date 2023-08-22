import { ERuleOptions } from './ERuleOptions';
import { ICriteria } from './ICriteria';

export interface IRule {
    type: ERuleOptions;
    criteria: ICriteria;
}
