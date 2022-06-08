import { Dataset } from 'src/app/models'
import BaseFilter from './PaginationFilter/BaseFilter';

export interface SyncHistory {
    id: string,
    datasetId?: string,
    dataset?: Dataset,
    syncTime?: string,
}

export interface SyncHistoryListFilter extends BaseFilter {
    datasetId?: string,
    dataTypeCode?: 'webapi' | 'file',
    officeCode?: string,
}